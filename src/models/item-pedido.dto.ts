import { ProdutoDTO } from "./produto.dto";

export interface ItemPedidoDTO{
  quantidade: number;
  produto: ProdutoDTO;
}
