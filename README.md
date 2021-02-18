# Tube Tag

Esse projeto tem como intuito fornecer uma ferramente para construção de etiquetas no modelo padrão para aplicação em criotubos.

A construção de etiquetas pode ser feita de duas maneiras, através da inserção de dados na interface do sistema ou através do envio de um csv.

## Construção utilizando interface

A construção de etiquetas utilizando a interface tem como intuito gerar um conjunto de etiquetas que possuem os mesmos dados de identificação porem com códigos de barras iniciando em um valor X e finalizando em outro valor, dentre eles gerando uma sequencia.

## Construção utilizando CSV

A construção de etiquetas utilizando um CSV tem como intuito gerar um número X de etiquetas aonde cada linha do CSV representa uma etiqueta.

Para etiquetas do tipo **simples** o arquivo CSV deve conter três colunas, que serão usadas para cada campo das etiquetas:

| Coluna 1 | Coluna 2 | Coluna 3 |
| - | :-: | -: |
| João | 25/03/1986 | Masculino |
| Maria | 07/12/1985 | Feminino |
| Carlos | 10/05/1982 | Masculino |

Para etiquetas do tipo **mini** o arquivo CSV deve conter somente uma coluna, utilizada para o título das etiquetas:

| Coluna 1 |
| - |
| ATIV_1 |
| ATIV_2 |
| ATIV_3 |

> Não utilize header no csv

[Clique aqui para acessar o sistema.](http://tag.otus-solutions.com.br/)
