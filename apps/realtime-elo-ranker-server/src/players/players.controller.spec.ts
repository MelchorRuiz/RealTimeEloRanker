import { Test, TestingModule } from '@nestjs/testing';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';

describe('PlayersController', () => {
  let controller: PlayersController;
  let service: PlayersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayersController],
      providers: [
        {
          provide: PlayersService,
          useValue: {
            addPlayer: jest.fn().mockResolvedValue({ id: 'Messi', rank: 1200 }),
            getPlayers: jest.fn().mockResolvedValue([{ id: 'Messi', rank: 1200 }]),
          },
        },
      ],
    }).compile();

    controller = module.get<PlayersController>(PlayersController);
    service = module.get<PlayersService>(PlayersService);
  });

  it('it should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('it should add a player', async () => {
    const result = await controller.addPlayer('Messi');
    expect(result).toEqual({ id: 'Messi', rank: 1200 });
    expect(service.addPlayer).toHaveBeenCalledWith('Messi');
  });

  it('it should get all players', async () => {
    const result = await controller.getAllPlayers();
    expect(result).toEqual([{ id: 'Messi', rank: 1200 }]);
    expect(service.getPlayers).toHaveBeenCalled();
  });
});
