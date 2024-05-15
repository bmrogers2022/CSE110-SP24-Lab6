const numNotes = await page.$$eval('.note', notes => notes.length);
    expect(numNotes).toBe(1);

describe('Explore section testing', () => {
  beforeAll(async () => {
      await page.goto('https://elaine-ch.github.io/CSE110-SP24-Lab6-Template/');
  });

  it('Add new note', async () => {
    await page.click('.add-note');
    const numNotes = await page.$$eval('.note', notes => notes.length);
    expect(numNotes).toBe(1);
  });

  it('Edit new note', async () => {
    const inputText = '01234';

    await page.type('.note', inputText);
    const startText = await page.$eval('.note', note => note.value);
    expect(startText).toBe(inputText);
    await page.keyboard.press('Tab');
  });

  it('Edit existing note', async () => {
    const inputText = '56789';
    const startText = await page.$eval('.note', note => note.value);

    await page.click('.note');
    await page.type('.note', inputText);
    const endText = await page.$eval('.note', note => note.value);
    expect(endText).toBe(startText+inputText);
    await page.keyboard.press('Tab');

    const numNotes = await page.$$eval('.note', notes => notes.length);
    expect(numNotes).toBe(1);
  });

  it('Notes are saved locally', async () => {
    const inputText = '56789';
    const startText = '01234';

    await page.reload();
    const numNotes = await page.$$eval('.note', notes => notes.length);
    const endText = await page.$eval('.note', note => note.value);
    expect(numNotes).toBe(1);
    expect(endText).toBe(startText+inputText);
  });

  it('Delete note by double clicking on note', async () => {
    await page.click('.note', {clickCount: 2});
    const numNotes = await page.$$eval('.note', notes => notes.length);
    expect(numNotes).toBe(0);
  });
});
