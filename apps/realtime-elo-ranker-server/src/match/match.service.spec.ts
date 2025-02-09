import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from './match.service';
import { Player } from '../players/entities/player.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('MatchService', () => {
  let service: MatchService;
  let repository: Repository<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchService,
        {
          provide: getRepositoryToken(Player),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MatchService>(MatchService);
    repository = module.get<Repository<Player>>(getRepositoryToken(Player));
  });

  it('it should be defined', () => {
    expect(service).toBeDefined();
  });

  it('it should throw an error if one or both players do not exist', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    await expect(service.createMatch({ winner: 'Player1', loser: 'Player2', draw: false })).rejects.toThrowError(NotFoundException);
  });

  it('it should return the new ranks of the players', async () => {
    const player1 = { id: 'Player1', rank: 1200 } as Player;
    const player2 = { id: 'Player2', rank: 1000 } as Player;
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(player1).mockResolvedValueOnce(player2);
    jest.spyOn(repository, 'save').mockResolvedValueOnce(player1);
    jest.spyOn(repository, 'save').mockResolvedValueOnce(player2);

    const result = await service.createMatch({ winner: 'Player1', loser: 'Player2', draw: false });
    expect(result).toHaveProperty('winner');
    expect(result.winner.rank).not.toBe(1200);
    expect(result.loser.rank).not.toBe(1000);
  });
});
