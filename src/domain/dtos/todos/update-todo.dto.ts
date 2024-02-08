

export class UpdateTodoDto {

    private constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date,
    ){}

    get values() {
        const objectValues : {[key: string] : any} = {};
        if(this.text) objectValues.text = this.text;
        if(this.completedAt) objectValues.completedAt = this.completedAt;
        return objectValues;
    }

    public static update(props: { [key: string] : any } ): [string?, UpdateTodoDto?] {
        const { id, text, completedAt } = props;

        let newCompletedAt = completedAt;

        if ( !id || isNaN(id) ) return ['Id must be a valid number'];

        if ( completedAt ) {
            newCompletedAt = new Date( completedAt )
            if ( newCompletedAt.toString() === 'Invalid Date' ) {
              return ['CompletedAt must be a valid date']
            }
          }

        return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
    }

}