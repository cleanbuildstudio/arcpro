const { execSync } = require('child_process');

// Let's create an html file that tests font families and renders them
const html = `
<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; background: white; }
  .test1 { font-family: 'Arial Narrow', sans-serif; font-size: 40px; }
  .test2 { font-family: 'Helvetica Neue', Helvetica, sans-serif; font-size: 40px; transform: scaleX(0.7); transform-origin: left; }
  .test3 { font-family: 'Oswald', sans-serif; font-size: 40px; }
  .test4 { font-family: 'Barlow Condensed', sans-serif; font-size: 40px; }
</style>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500&family=Oswald:wght@400;500&display=swap" rel="stylesheet">
</head>
<body>
  <div class="test1">ArchPro brings every aspect of designing and building spaces into one</div>
  <div class="test2">ArchPro brings every aspect of designing and building spaces into one</div>
  <div class="test3">ArchPro brings every aspect of designing and building spaces into one</div>
  <div class="test4">ArchPro brings every aspect of designing and building spaces into one</div>
</body>
</html>
`;
require('fs').writeFileSync('C:/Users/adnan/Desktop/works/archpro/test_fonts.html', html);

const cmd = `"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --headless --disable-gpu --no-sandbox --screenshot="C:\\Users\\adnan\\.gemini\\antigravity\\brain\\34f0811b-98fd-492a-8f0b-24c5fa341049\\font_comparison.png" --window-size=1200,600 file:///C:/Users/adnan/Desktop/works/archpro/test_fonts.html`;
execSync(cmd);
console.log('done');
