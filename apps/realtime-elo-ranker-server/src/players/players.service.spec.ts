import { Test, TestingModule } from '@nestjs/testing';
import { PlayersService } from './players.service';
import { Player } from './entities/player.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('PlayersService', () => {
  let service: PlayersService;
  let repository: Repository<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayersService,
        {
          provide: getRepositoryToken(Player),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PlayersService>(PlayersService);
    repository = module.get<Repository<Player>>(getRepositoryToken(Player));
  });

  it('it should be defined', () => {
    expect(service).toBeDefined();
  });

  it('it should add a player', async () => {
    jest.spyOn(repository, 'find').mockResolvedValue([{ id: 'Ronaldo', rank: 1200 } as Player]);
    jest.spyOn(repository, 'save').mockImplementation((player: Player) => Promise.resolve(player));
    jest.spyOn(repository, 'create').mockImplementation((player: Player) => player);

    const player = await service.addPlayer('Messi');

    expect(player).toEqual({ id: 'Messi', rank: 1200 });
    expect(repository.save).toHaveBeenCalledWith({ id: 'Messi', rank: 1200 });
  });

  it('it should get all players', async () => {
    const playersMock = [
      { id: 'Messi', rank: 1200 },
      { id: 'Ronaldo', rank: 1300 },
    ] as Player[];

    jest.spyOn(repository, 'find').mockResolvedValue(playersMock);

    const players = await service.getPlayers();

    expect(players).toEqual(playersMock);
  });

  it('it should calculate average rank', async () => {
    jest.spyOn(repository, 'find').mockResolvedValue([
      { id: 'Player1', rank: 1100 },
      { id: 'Player2', rank: 1300 },
    ] as Player[]);

    const avgRank = await service['calculateAverageRank']();

    expect(avgRank).toBe(1200);
  });
});
