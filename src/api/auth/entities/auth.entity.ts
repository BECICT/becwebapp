import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Auth{
    @PrimaryGeneratedColumn("uuid")
    Id: string;

    @Column()
    fullname: string

    @Column({unique: true})
    phoneNo:string

    @Column()
    password: string

    @Column({default: true})
    firstlogin: boolean

    @Column({default: 'Member'})
    role: string

    @Column()
    failedloginAttempt: number

    @CreateDateColumn({name: 'CreatedOn', default: new Date()})
    CreatedOn: Date;

    @UpdateDateColumn({name: 'UpdatedOn', default: new Date(), nullable: true})
    UpdatedOn: Date;
  static Service: any;

}