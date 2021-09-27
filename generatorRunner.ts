export class GeneratorRunner {
  private args: any[] = [];
  private yieldStubs: any[] = [undefined]; //first stub is discarded

  constructor(private generatorFunc: (...args: any) => Generator<any>) {}

  withArgs(...args: any[]) {
    this.args = args;
    return this;
  }

  stubYieldOnce(value: any) {
    this.yieldStubs.push(value);
    return this;
  }

  runToCompletion() {
    const generator = this.generatorFunc(...this.args);
    let i = 0;
    let res: IteratorResult<any> = {done: false, value: undefined};

    while (!res.done) {
      const yieldStub = this.yieldStubs[i];
      if (yieldStub === undefined) {
        res = generator.next();
      } else {
        res = generator.next(yieldStub);
      }

      i++;
    }

    return res.value;
  }
}