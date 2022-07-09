import React, { memo, useState } from "react";
import { AddProductToWishlistProps } from "./AddProductToWishlist";
// import { AddProductToWishlist } from "./AddProductToWishlist";

const AddProductToWishlist = React.lazy<AddProductToWishlistProps>(() => {
  return import("./AddProductToWishlist");
});
interface ProductItemProps {
  product: {
    id: number;
    title: string;
    price: number;
    priceFormatted: string;
  };
  onAddToWishlist: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishlist === true && (
        <AddProductToWishlist
          onAddToWishlist={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        ></AddProductToWishlist>
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    // return Object.is(prevProps.product, nextProps.product);
    return lodash.isEqual(prevProps.product, nextProps.product);
  }
);

/**
 * 1. Criar uma nova versao do componente
 * 2. Compara com a versao anterior
 * 3. se tiver alteracoes, atualiza com o que alterou
 * //shallow compare = verifica a igualdade das informações dentro das propriedades
 * {} === {} = false = Igualdade referencial --- compara se estao ocupando o mesmo
 * lugar na memória
 */

/**
 * Cuidado com otimização prematura - Custo da comparação do memo
 * Onde Utilizar
 * 1. Componentes que são puros (pure funcional components) - Abstrair a parte visual
 * 2. Componentes que renderizam muito - Render too often
 * 3. Componente renderiza novamente com as mesmas props - re-renders with same props
 * 4. Componte médio para grande - Medium to big size
 */

/**
 * useMemo
 *
 * 1. Calculos pesados
 * 2. igualdade referencial -- ocupam o mesmo espaço na memória
 *  repassa informação a um componente filho
 * Memoriza um Valor
 *
 * useCallBack
 * Memoriza uma função
 * quando renderiza dentro de outro componente
 * usa muito no contexto quando tem uma funcao que renderiza em muitos componentes
 */
