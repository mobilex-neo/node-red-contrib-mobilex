# node-red-contrib-mobilex 
**Pacote Node-RED para gerar interfaces no mobileX Front usando a Linguagem X.** 
Com esses nós, você pode criar telas para aplicativos **mobileX** diretamente no fluxo do Node-RED, gerando JSONs compatíveis com a plataforma **low-code mobileX**.

## Recursos 

- `mobilex-list-view` → Renderiza listas dinâmicas no mobileX. 
- `mobilex-carousel` → Cria um carrossel de imagens/textos. 
- `mobilex-header` → Define o cabeçalho da tela. 
- `mobilex-form` → Gera um formulário interativo.

## Instalação

Clone o repositório e instale localmente no Node-RED:

```bash
cd ~/.node-red 
git clone https://github.com/mobilex-neo/node-red-contrib-mobilex.git
cd node-red-contrib-mobilex
npm install
``` 

Ou instale manualmente copiando os arquivos para  `~/.node-red/node_modules/`. Após instalar, **reinicie o Node-RED** e os nós estarão disponíveis na categoria **mobilex**. 

---

## Como Usar ### 

1. `mobilex-list-view` (Lista de Itens)

Esse nó transforma um **array de objetos** em uma lista formatada para o **mobileX Front**.

#### **Exemplo de Input (msg.payload):** 
```json 
[
	{ 
		"nome": "João Silva", 
		"telefone": "(11) 99999-9999" 
	}, 
	{ 
		"nome": "Maria Souza", 
		"telefone": "(21) 98888-8888" 
	} 
] 
```
#### **Exemplo de Output JSON:** 

```json
{ 
	"pageNavigation": {
		 "title": "Contatos", 
		"background": "#482073" 
	}, 
	"pageHeader": { 
		"template": "A", 
		"background": "#482073", 
		"color": "#FFF" 
	}, 
	"pageContent": { 
		"template": "A", 
		"sectionList": [ 
			{ 
				"title": "Lista de Contatos", 
				"sections": [ 
					{
							"type": "html", 
							"title": "João Silva", 
							"value": "(11) 99999-9999" 
					},
					{ 
						"type": "html",
							"title": "Maria Souza",
						"value": "(21) 98888-8888" 
					} 
				]
			} 
		] 
	} 
}
```
---

### 2. `mobilex-carousel` (Carrossel) 

Esse nó gera um **carrossel horizontal** de imagens ou textos. 

#### **Exemplo de Input (msg.payload):** 

```json 
[ 
	{ 
		"imagem": "https://exemplo.com/1.jpg",
		"texto": "Promoção A" 
	}, 
	{ 
		"imagem": "https://exemplo.com/2.jpg", 
		"texto": "Promoção B" 
	} 
]
```

#### **Exemplo de Output JSON:** 

```json
{ 
	"pageNavigation": {
		"title": "Carrossel", 
		"background": "#482073" 
	},
	"pageContent": {
		"template": "CAROUSEL-B",
		"groupList": [ 
			{ 
				"itemsList": [ 
					{ 
						"background": "https://exemplo.com/1.jpg",
					 	"details": [
							{ 
								"value": "Promoção A" 
							}
						] 
					}, 
					{ 
						"background": "https://exemplo.com/2.jpg",
						"details": [
							{ 
								"value": "Promoção B" 
							}
						] 
					} 
				] 
			} 
		] 
	} 
}
```
---
## Contribuindo 

1. **Clone o repositório:** 
```bash 
git clone https://github.com/seu-usuario/node-red-contrib-mobilex.git 
cd node-red-contrib-mobilex 
``` 

2. **Faça modificações e instale localmente:** 
```bash
npm install 
```

3. **Teste no Node-RED:** 
```bash 
node-red 
``` 
--- 
## Licença 
Este projeto é licenciado sob a licença **MIT**. 