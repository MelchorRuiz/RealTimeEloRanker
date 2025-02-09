import { Test, TestingModule } from '@nestjs/testing';
import { PlayersService } from './players.service';
import { Player } from './entities/player.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, ConflictException } from '@nestjs/common';

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

  it('it should throw error 400 if player name is empty', async () => {
    await expect(service.addPlayer('')).rejects.toThrow(BadRequestException);
  });

  it('it should throw error 409 if player already exists', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue({ id: 'Messi', rank: 1000 } as Player);

    await expect(service.addPlayer('Messi')).rejects.toThrow(ConflictException);
  });

  it('it should add a player', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    jest.spyOn(repository, 'find').mockResolvedValue([]);
    jest.spyOn(repository, 'create').mockReturnValue({ id: 'Messi', rank: 1200 });
    jest.spyOn(repository, 'save').mockResolvedValue({ id: 'Messi', rank: 1200 });

    const player = await service.addPlayer('Messi');
    expect(player).toEqual({ id: 'Messi', rank: 1200 });
  });
});
