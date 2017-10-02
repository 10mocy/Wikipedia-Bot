const request = require('sync-request');

const extractPage = pages => Object.entries(pages).map(page => page[1].extract)[0];

exports.search = (word) => {
  const wikicontent = /(.*):(.*)/;

  let result;

  if (!wikicontent.test(word)) {
    const endpoint = 'https://ja.wikipedia.org/w/api.php';
    const parameter = `?action=query&format=json&prop=extracts&redirects=1&explaintext=1&titles=${encodeURIComponent(word)}`;

    /* request('GET', endpoint + parameter, (res) => {
            console.log(res.getBody());
        }); */
    const res = request('GET', endpoint + parameter);
    const content = res.getBody('utf8');
    const data = JSON.parse(content);

    if (-1 in data.query.pages) {
      // 存在しない時
      result = null;
    } else {
      result = extractPage(data.query.pages);
    }

    /* https.get(, (res) => {
            res.setEncoding('utf8');

            // データ取得
            res.on('data', (chunk) => {
                content += chunk;
            });

            // データ整形
            res.on('end', (res) => {
                const data = JSON.parse(content);

                if(-1 in data.query.pages) {
                    // 存在しない時
                    result = null;
                } else {
                    // 存在する時
                    let wikiinfo; // Wikipedia 情報取得管理
                    for(key in data.query.pages) {
                        result = data['query']['pages'][key]['extract'].split(/。/)[0] + '。';
                    }
                }
            });

        }); */
  } else {
    result = null;
  }
  return result;
};

// テスト用
exports.extractPage = extractPage;
