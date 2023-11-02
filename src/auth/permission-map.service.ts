import { Injectable } from '@nestjs/common';

@Injectable()
export class MappingService {
  private mapping: Map<string, string> = new Map<string, string>();

  constructor() {
    this.setupMappings();
  }

  private setupMappings() {
    this.mapping.set('pa', 'party');
    this.mapping.set('qu', 'quality');
    this.mapping.set('u', 'user');
    this.mapping.set('sb', 'stockBatch');
    this.mapping.set('sh', 'shade');
    this.mapping.set('su', 'supplier');
    this.mapping.set('sr', 'supplier/rate');
    this.mapping.set('cs', 'cs');
    this.mapping.set('b', 'boiler');
    this.mapping.set('pr', 'dyeingProcess');
    this.mapping.set('pp', 'productionPlan');
    this.mapping.set('jp', 'jet');
    this.mapping.set('pt', 'department');
    this.mapping.set('d', 'dispatch');
    this.mapping.set('bf', 'batch');
    this.mapping.set('ip', 'machine');
    this.mapping.set('ds', 'dyeingSlip');
    this.mapping.set('emp', 'employee');
    this.mapping.set('attnds', 'attendance');
    this.mapping.set('po', 'purchase');
    this.mapping.set('mg', 'mergeBatch');
    this.mapping.set('tt', 'task');
    this.mapping.set('rpt', 'report');
    this.mapping.set('pln', 'pln');
  }

  getMapping(key: string): string | undefined {
    return this.mapping.get(key);
  }

  getPermissionMapping(): any {
    return this.mapping;
  }

  getKeyByValue(value: string): string | undefined {
    const entry = Array.from(this.mapping.entries()).find(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([key, val]) => val === value,
    );
    return entry ? entry[0] : undefined;
  }
}
