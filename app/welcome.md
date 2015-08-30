Welcome to Material Markdown!
=============================

> The overriding design goal for Markdown’s formatting syntax is to make it as readable as possible. The idea is that a Markdown-formatted document should be publishable as-is, as plain text, without looking like it’s been marked up with tags or formatting instructions. -John Gruber, creator of Markdown

### The Basics

Markdown is just a way to convert plaintext into HTML, which is rendered on the right with formatting. It works by looking for special syntax that specifies what formatting should be applied.

_italics_, **bold**

- List items are easy
- Plain and simple


1. Ordered lists work too
2. Easy!

Use backticks for `inline code`,

Use three consecutive backticks for codeblocks:

```javascript
function hello(){
  console.log("Material Markdown says hello");
}
```

### Github Flavored Markdown

Material Markdown has support for [Github Flavored Markdown](https://help.github.com/articles/github-flavored-markdown/) (GFM), so you can also do stuff like:

~~Cross stuff out~~

...or make a table:

First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell

In addition, MM supports [mermaid.js](http://knsv.github.io/mermaid/), a markdown-like way of creating charts and graphs. To make a mermaid figure simply specify the language of the codeblock as 'graph' or 'sequenceDiagram':

```
sequenceDiagram
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
```

There's a ton of cool stuff mermaid can do...go to their site to learn all its features!