
export class TodoEntity {

    constructor(
        public id         : number,
        public text       : string,
        public completedAt ?: Date | null
    ){}

    get isCompleted(): boolean {
        return !!this.completedAt;
    }

    public static fromObject(object: { [key:string]:any }): TodoEntity {

        const { id, text, completedAt } = object;
        

        if( !id || !text ) throw new Error('Invalid object');

        let newCompleteAt;
        if( completedAt ) {
            newCompleteAt = new Date(completedAt);
            if( isNaN( newCompleteAt.getTime()) ) {
                throw new Error('Invalid completeAt');
            }
        }

        return new TodoEntity(
            id,
            text,
            completedAt
        );
    }

}