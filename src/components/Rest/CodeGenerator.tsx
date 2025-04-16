import React from 'react';
import { useTranslation } from 'react-i18next';

interface CodeGeneratorProps {
  method: string;
  url: string;
  headers: { key: string; value: string }[];
  body: string;
}

const CodeGenerator: React.FC<CodeGeneratorProps> = ({
  method,
  url,
  headers,
  body,
}) => {
  const { t } = useTranslation();

  if (!url || !method) return <p>{t('codegen.notEnough')}</p>;

  const filteredHeaders = headers.filter((h) => h.key);

  const formattedHeadersCurl = filteredHeaders
    .map((h) => `-H "${h.key}: ${h.value}"`)
    .join(' ');

  const curlCommand =
    method === 'GET'
      ? `curl ${formattedHeadersCurl} "${url}"`
      : `curl -X ${method} ${formattedHeadersCurl} -d '${body}' "${url}"`;

  const jsFetch = `
fetch("${url}", {
  method: "${method}",
  headers: {
    ${filteredHeaders.map((h) => `"${h.key}": "${h.value}"`).join(',\n    ')}
  },
  ${method !== 'GET' ? `body: \`${body}\`,` : ''}
})
  .then(res => res.json())
  .then(data => console.log(data));
`.trim();

  const jsXHR = `
const xhr = new XMLHttpRequest();
xhr.open("${method}", "${url}", true);
${filteredHeaders
  .map((h) => `xhr.setRequestHeader("${h.key}", "${h.value}");`)
  .join('\n')}
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    console.log(xhr.responseText);
  }
};
${method !== 'GET' ? `xhr.send(\`${body}\`);` : 'xhr.send();'}
`.trim();

  const nodeJS = `
const https = require('https');

const options = {
  method: '${method}',
  headers: {
    ${filteredHeaders.map((h) => `'${h.key}': '${h.value}'`).join(',\n    ')}
  }
};

const req = https.request('${url}', options, res => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => { console.log(data); });
});

req.on('error', error => console.error(error));
${method !== 'GET' ? `req.write(\`${body}\`);` : ''}
req.end();
`.trim();

  const python = `
import requests

url = "${url}"
headers = {
    ${filteredHeaders.map((h) => `"${h.key}": "${h.value}"`).join(',\n    ')}
}
${method !== 'GET' ? `data = '''${body}'''` : ''}
response = requests.request("${method}", url, headers=headers${method !== 'GET' ? ', data=data' : ''})
print(response.text)
`.trim();

  const java = `
import java.io.*;
import java.net.*;

public class Main {
  public static void main(String[] args) throws Exception {
    URL url = new URL("${url}");
    HttpURLConnection con = (HttpURLConnection) url.openConnection();
    con.setRequestMethod("${method}");
    ${filteredHeaders
      .map((h) => `con.setRequestProperty("${h.key}", "${h.value}");`)
      .join('\n    ')}
    ${
      method !== 'GET'
        ? 'con.setDoOutput(true);\n    try (OutputStream os = con.getOutputStream()) {\n      byte[] input = "' +
          body +
          '".getBytes("utf-8");\n      os.write(input, 0, input.length);\n    }'
        : ''
    }
    BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
    String inputLine;
    StringBuffer content = new StringBuffer();
    while ((inputLine = in.readLine()) != null) {
        content.append(inputLine);
    }
    in.close();
    System.out.println(content.toString());
  }
}
`.trim();

  const csharp = `
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

class Program {
  static async Task Main() {
    using var client = new HttpClient();
    var request = new HttpRequestMessage(HttpMethod.${method.toUpperCase()}, "${url}");
    ${filteredHeaders
      .map((h) => `request.Headers.Add("${h.key}", "${h.value}");`)
      .join('\n    ')}
    ${method !== 'GET' ? `request.Content = new StringContent("${body.replace(/"/g, '\\"')}", Encoding.UTF8, "application/json");` : ''}
    var response = await client.SendAsync(request);
    var responseBody = await response.Content.ReadAsStringAsync();
    Console.WriteLine(responseBody);
  }
}
`.trim();

  const go = `
package main

import (
  "bytes"
  "fmt"
  "io/ioutil"
  "net/http"
)

func main() {
  url := "${url}"
  method := "${method}"
  payload := []byte(\`${body}\`)

  client := &http.Client{}
  req, _ := http.NewRequest(method, url, ${method !== 'GET' ? 'bytes.NewBuffer(payload)' : 'nil'})
  ${filteredHeaders
    .map((h) => `req.Header.Add("${h.key}", "${h.value}")`)
    .join('\n  ')}
  res, _ := client.Do(req)
  defer res.Body.Close()
  body, _ := ioutil.ReadAll(res.Body)
  fmt.Println(string(body))
}
`.trim();

  return (
    <div>
      <h2>{t('codegen.title')}</h2>
      <details>
        <summary>cURL</summary>
        <pre>{curlCommand}</pre>
      </details>
      <details>
        <summary>JavaScript (Fetch)</summary>
        <pre>{jsFetch}</pre>
      </details>
      <details>
        <summary>JavaScript (XHR)</summary>
        <pre>{jsXHR}</pre>
      </details>
      <details>
        <summary>Node.js</summary>
        <pre>{nodeJS}</pre>
      </details>
      <details>
        <summary>Python</summary>
        <pre>{python}</pre>
      </details>
      <details>
        <summary>Java</summary>
        <pre>{java}</pre>
      </details>
      <details>
        <summary>C#</summary>
        <pre>{csharp}</pre>
      </details>
      <details>
        <summary>Go</summary>
        <pre>{go}</pre>
      </details>
    </div>
  );
};

export default CodeGenerator;
