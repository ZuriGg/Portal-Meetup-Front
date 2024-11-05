# Tutorial creación componentes

Para crear la estructura básica de un componente de react existe un "atajo" para poder hacerlo al instante

## Atajo

**Código a escribir**  
_Ignorar el punto y coma ";", se coloca así al guardar el MarkDown con Prettier_

```javascript
rfce;
```

Al pulsar "tabulador" se autocompletará la estructura básica del componente con el propio nombre del componente

Ej:

- Header.jsx

```Javascript
import React from 'react'

function Header() {
  return (
    <div>Header</div>
  )
}

export default Header
```

## Consejo

Al crear el componente, sustituir:

```Javascript
<div>
    Header
<div/>
```

Por:

```Javascript
<>

</>
```

Y asegurarse de que no guardamos inmediatamente, por que el "return" perderá los paréntesis a causa del "Prettier"

Por ello recomiendo también lo siguiente:

```javascript
import React from "react";

function Header() {
  return (
    <>
      <p></p>
    </>
  );
}

export default Header;
```

Así al tener mas de un componente, no eliminará los paréntesis.
