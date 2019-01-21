/**
 * Created by Arya on 7/30/2018.
 */
import {FieldBase} from './FieldBase';

export class FieldFile extends FieldBase<string> {
  controlType = 'file';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
