import { Column, CreateDateColumn, BaseEntity, PrimaryGeneratedColumn, Entity } from "typeorm";

// @Entity()
export abstract class AbstractBaseEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    createdBy: string

    @Column({nullable: true })
    updatedBy: string

    @CreateDateColumn()
    createdAt: Date  = new Date()

    @CreateDateColumn({ nullable: true })
    updatedAt: Date

}

