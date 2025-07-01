export class Field {
  constructor(
      public field: FieldCore,
      public subQuestion: SubQuestion,
      public isGlobal: string,
      public documentTemplateId: string,
      public _id: string,
  ){}
}

export class FieldOnly {
  constructor(
      public field: FieldCore,
      public isGlobal: string,
      public documentTemplateId: string,
      public _id: string,
  ){}
}

export class FieldCore {
  constructor(
    public name: string,
    public question: string,
    public answerType: string,
    public placeHolder: string,
    public questionMark: string,
    public answerValue: string[]
  ){}
}

export class SubQuestion {
  constructor(
  public field: FieldCore,
  public isFilled: string,
  public conditionOperator: string,
  public conditionValue: string,
  ) {}
}
