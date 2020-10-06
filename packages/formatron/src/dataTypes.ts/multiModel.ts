import { RelatedType } from './related';

export class MultiModelType extends RelatedType {
  public static readonly typeName = 'multiModel';

  get isOnReport(): boolean {
    return false;
  }

  get isOnColumn(): boolean {
    return false;
  }

  get defaultValue(): any {
    return this.field.options?.defaultValue ?? [];
  }

  isOfType(value: unknown): value is number[] {
    return (
      Array.isArray(value) && value.every((item) => typeof item === 'number')
    );
  }

  validate = (value: any): string | null => {
    if (
      this.isRequired &&
      (value === undefined ||
        value === null ||
        (Array.isArray(value) && value.length === 0))
    ) {
      return 'Required field';
    }

    return null;
  };
}
