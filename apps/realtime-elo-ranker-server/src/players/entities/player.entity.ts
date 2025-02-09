import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('players')
export class Player {
  @PrimaryColumn()
  id: string;

  @Column()
  rank: number;
}
