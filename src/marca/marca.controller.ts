import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { MarcaTypadoDto } from './typado/typado.marcaTypado';
import { Marca } from './marca.entity';

@Controller('marca')
export class MarcaController {
    constructor(private readonly marcaService: MarcaService) {}

    @Get()
    async obtenerTodasLasMarcas(): Promise<Marca[]> {
        return await this.marcaService.obtenerTodasLasMarcas();
    }

    @Get(':id')
    async obtenerMarcaPorId(@Param('id') id: number): Promise<Marca> {
        return await this.marcaService.obtenerMarcaPorId(id);
    }

    @Post()
    async crearMarca(@Body() marcaDto: MarcaTypadoDto): Promise<Marca> {
        return await this.marcaService.crearMarca(marcaDto);
    }

    @Patch(':id')
    async actualizarMarca(@Param('id') id: number, @Body() marcaDto: MarcaTypadoDto): Promise<Marca> {
        return await this.marcaService.actualizarMarca(id, marcaDto);
    }

    @Delete(':id')
    async eliminarMarca(@Param('id') id: number){
        return await this.marcaService.eliminarMarca(id);
    }
}
