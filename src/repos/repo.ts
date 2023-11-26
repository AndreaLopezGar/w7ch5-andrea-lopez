export interface Repository<X extends { id: unknown }> {
  getAll(): Promise<X[]>;
  getById(_id: X['id']): Promise<X>;
  // eslint-disable-next-line no-unused-vars
  search({ key, value }: { key: keyof X; value: unknown }): Promise<X[]>;
  create(_newData: Omit<X, 'id'>): Promise<X>;
  update(_id: X['id'], _updatedData: Partial<X>): Promise<X>;
  delete(_id: X['id']): Promise<void>;
}
