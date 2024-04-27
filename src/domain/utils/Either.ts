export type Either<L, A> = Left<L> | Right<A>;

export class Left<L> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isLeft(): this is Left<L> {
    return true;
  }

  isRight(): this is Right<L> {
    return false;
  }
}

export class Right<A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isLeft(): this is Left<A> {
    return false;
  }

  isRight(): this is Right<A> {
    return true;
  }
}

export const left = <L>(l: L): Left<L> => {
  return new Left(l);
};

export const right = <A>(a: A): Right<A> => {
  return new Right<A>(a);
};
