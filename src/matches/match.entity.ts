import { Team } from '../teams/team.entity';
import {
  Check,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@Check('"homeTeamId" != "awayTeamId"')
export class Match {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Team, { nullable: false, eager: true })
  homeTeam: Team;

  @ManyToOne(() => Team, { nullable: false, eager: true })
  awayTeam: Team;

  @Column()
  homeTeamScore: number;

  @Column()
  awayTeamScore: number;
}
