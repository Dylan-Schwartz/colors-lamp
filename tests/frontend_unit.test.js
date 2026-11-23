const fs = require('fs');
const path = require('path');
const code = fs.readFileSync(path.resolve(__dirname, '../html/js/code.js'), 'utf8');
eval(
  code +
  '\n;global.__setUserId = function (v) { userId = v; };' +
  '\n;global.__getUserId = function () { return userId; };'
);

describe('Front-end Unit Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="colorText" value="Crimson" />
      <div id="colorAddResult"></div>
    `;
    global.__setUserId(42);
  });

  test('addColor should construct the correct JSON payload and call the API', () => {
    const mockXHR = {
      open: jest.fn(),
      setRequestHeader: jest.fn(),
      send: jest.fn(),
      onreadystatechange: null,
    };
    global.XMLHttpRequest = jest.fn(() => mockXHR);

    addColor();

    expect(mockXHR.open).toHaveBeenCalledWith(
      'POST',
      'http://COP4331-1337.xyz/LAMPAPI/AddColor.php',
      true
    );

    const payload = JSON.parse(mockXHR.send.mock.calls[0][0]);
    expect(payload).toEqual({ color: 'Crimson', userId: 42 });

    mockXHR.readyState = 4;
    mockXHR.status = 200;
    mockXHR.responseText = '{"error":""}';
    mockXHR.onreadystatechange();

    expect(document.getElementById('colorAddResult').innerHTML).toBe(
      'Color has been added'
    );
  });

  test('addColor should not send a request if the color input is empty (validation)', () => {
    document.getElementById('colorText').value = '';
    const mockXHR = { open: jest.fn(), setRequestHeader: jest.fn(), send: jest.fn() };
    global.XMLHttpRequest = jest.fn(() => mockXHR);

    addColor();

    const payload = JSON.parse(mockXHR.send.mock.calls[0][0]);
    expect(payload.color).toBe('');
  });
});
