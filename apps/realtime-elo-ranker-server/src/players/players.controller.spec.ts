import { Test, TestingModule } from '@nestjs/testing';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { BadRequestException, ConflictException } from '@nestjs/common';

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

  it('it should return an error 400 if the player name is empty', async () => {
    jest.spyOn(service, 'addPlayer').mockRejectedValueOnce(new BadRequestException('El ID del jugador (nombre) es obligatorio'));
    await expect(controller.addPlayer('')).rejects.toThrow(BadRequestException);
  });

  it('it should return an error 409 if the player already exists', async () => {
    jest.spyOn(service, 'addPlayer').mockRejectedValueOnce(new ConflictException('El jugador ya existe'));
    await expect(controller.addPlayer('Messi')).rejects.toThrow(ConflictException);
  });

  it('debería devolver un jugador creado correctamente', async () => {
    const result = await controller.addPlayer('Messi');
    expect(result).toEqual({ id: 'Messi', rank: 1200 });
  });
});
