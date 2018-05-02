# Clarity PDF Server

## Installation from npm

`npm install -g @clarityenglish/couloir-pdf-server`

_(You may need to login to the Clarity npm account using `npm login` as this is a private repository)._

## Running

The server can be run with the `couloir-pdf-server` command.

### Options

- `--host` - the host to listen on (defaults to `0.0.0.0`)
- `--port` - the port to listen on (defaults to `80`)

## Use

Assuming the server is running on `localhost` on port `3050`, you can generate a PDF of
`https://www.google.com` by visiting:

`http://localhost?url=https://www.google.com`

In the event of success the response will be the rendered PDF (with mimetype `application/pdf`).  In the event of failure the server will return a 500 page with some JSON describing the error of the form:

```json
{ "success": false, "error": "The error message" }
```

```css
@media print {
  @page {
    size: landscape;
  }
}
```
