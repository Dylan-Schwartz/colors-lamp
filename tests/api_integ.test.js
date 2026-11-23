const fs = require('fs');
const path = require('path');
const code = fs.readFileSync(path.resolve(__dirname, '../html/js/code.js'), 'utf8');
eval(
  code +
  '\n;global.__setUserId = function (v) { userId = v; };' +
  '\n;global.__getUserId = function () { return userId; };'
);

describe('Integration Test: Search Colors API Interaction', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="searchText" value="Red" />
      <div id="colorSearchResult"></div>
      <p></p>
    `;
    global.__setUserId(7);
  });

  test('searchColor should parse a successful API JSON response and render the list', () => {
    const mockXHR = {
      open: jest.fn(),
      setRequestHeader: jest.fn(),
      send: jest.fn(),
      onreadystatechange: null,
    };
    global.XMLHttpRequest = jest.fn(() => mockXHR);

    searchColor();

    expect(mockXHR.open).toHaveBeenCalledWith(
      'POST',
      'http://COP4331-1337.xyz/LAMPAPI/SearchColors.php',
      true
    );
    const payload = JSON.parse(mockXHR.send.mock.calls[0][0]);
    expect(payload).toEqual({ search: 'Red', userId: 7 });

    mockXHR.readyState = 4;
    mockXHR.status = 200;
    mockXHR.responseText = JSON.stringify({
      results: ['Red', 'Crimson', 'Scarlet'],
      error: '',
    });
    mockXHR.onreadystatechange();

    const paragraph = document.getElementsByTagName('p')[0];
    expect(paragraph.innerHTML).toContain('Red');
    expect(paragraph.innerHTML).toContain('Crimson');
    expect(paragraph.innerHTML).toContain('Scarlet');
  });

  test('searchColor should handle an API error response gracefully', () => {
    const mockXHR = {
      open: jest.fn(),
      setRequestHeader: jest.fn(),
      send: jest.fn(),
      onreadystatechange: null,
    };
    global.XMLHttpRequest = jest.fn(() => mockXHR);

    searchColor();

    mockXHR.readyState = 4;
    mockXHR.status = 200;
    mockXHR.responseText = JSON.stringify({ results: [], error: 'No Records Found' });
    mockXHR.onreadystatechange();

    expect(document.getElementById('colorSearchResult').innerHTML).toBe(
      'Color(s) has been retrieved'
    );
  });
});
