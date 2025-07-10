import * as _ from "lodash";

export class DataMapper {
  static extractValue(data: any, path: string): any {
    // Handle array notation like exercises[id=235].setList[0].time
    if (path.includes("[")) {
      return this.extractComplexPath(data, path);
    }

    // Handle pipe notation for multiple values
    if (path.includes("|")) {
      const paths = path.split("|");
      const values = paths.map((p) => _.get(data, p));
      return values.filter((v) => v !== undefined).join("/");
    }

    return _.get(data, path);
  }

  private static extractComplexPath(data: any, path: string): any {
    const segments = path.split(".");
    let current = data;

    for (const segment of segments) {
      if (segment.includes("[")) {
        const [arrayName, condition] = segment.split("[");
        const conditionClean = condition.replace("]", "");

        if (conditionClean.includes("=")) {
          // Handle condition like id=235
          const [key, value] = conditionClean.split("=");
          const numValue = isNaN(Number(value)) ? value : Number(value);
          current = current[arrayName]?.find(
            (item: any) => item[key] == numValue
          );
        } else {
          // Handle index like [0]
          const index = parseInt(conditionClean);
          current = current[arrayName]?.[index];
        }
      } else {
        current = current?.[segment];
      }

      if (current === undefined) break;
    }

    return current;
  }

  static classifyValue(value: number, classification: any): any {
    if (!classification || !classification.ranges) return null;

    const range = classification.ranges.find(
      (r: any) => value >= r.min && value <= r.max
    );

    return range || null;
  }

  static formatValue(value: any, format?: string): string {
    if (value === null || value === undefined) return "N/A";

    switch (format) {
      case "number":
        return Number(value).toFixed(1);
      case "percentage":
        return `${Number(value).toFixed(1)}`;
      default:
        return String(value);
    }
  }
}
