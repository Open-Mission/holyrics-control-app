<!--
Fonte original: /Users/claudio/Downloads/holyrics-api.md
Recorte gerado de forma mecânica. Linhas originais: 10112-10722.
-->

# Classes: infos e eventos

## SongInfo
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID da música |
| `title` | _String_ | Título da música |
| `artist` | _String_ | Artista da música |
| `author` | _String_ | Autor da música |
| `note` | _String_ | Anotação da música |
| `copyright` | _String_ | Copyright da música |
| `key` | _String_ | Tom da música.<br>Pode ser: `C` `C#` `Db` `D` `D#` `Eb` `E` `F` `F#` `Gb` `G` `G#` `Ab` `A` `A#` `Bb` `B` `Cm` `C#m` `Dbm` `Dm` `D#m` `Ebm` `Em` `Fm` `F#m` `Gbm` `Gm` `G#m` `Abm` `Am` `A#m` `Bbm` `Bm` |
| `bpm` | _Number_ | BPM da música |
| `time_sig` | _String_ | Tempo da música.<br>Pode ser: `2/2` `2/4` `3/4` `4/4` `5/4` `6/4` `3/8` `6/8` `7/8` `9/8` `12/8` |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "id": "0",
  "title": "",
  "artist": "",
  "author": "",
  "note": "",
  "copyright": "",
  "key": "",
  "bpm": 0.0,
  "time_sig": ""
}
```
</details>

## TextInfo
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do texto |
| `title` | _String_ | Título do texto |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "id": "",
  "title": ""
}
```
</details>

## VerseInfo
<details>
  <summary>Ver exemplo</summary>

```json
{}
```
</details>

## AudioInfo
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `file_name` | _String_ |  |
| `file_fullname` | _String_ |  |
| `file_relative_path` | _String_ |  |
| `file_path` | _String_ |  |
| `is_dir` | _Boolean_ |  |
| `extension` | _String_ |  |
| `properties` | _Object_ |  |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "file_name": "file.mp3",
  "file_fullname": "folder\\file.mp3",
  "file_relative_path": "audio\\folder\\file.mp3",
  "file_path": "C:\\Holyrics\\Holyrics\\files\\media\\audio\\folder\\file.mp3",
  "is_dir": false,
  "extension": "mp3"
}
```
</details>

## VideoInfo
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `file_name` | _String_ |  |
| `file_fullname` | _String_ |  |
| `file_relative_path` | _String_ |  |
| `file_path` | _String_ |  |
| `is_dir` | _Boolean_ |  |
| `extension` | _String_ |  |
| `properties` | _Object_ |  |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "file_name": "file.mp4",
  "file_fullname": "folder\\file.mp4",
  "file_relative_path": "video\\folder\\file.mp4",
  "file_path": "C:\\Holyrics\\Holyrics\\files\\media\\video\\folder\\file.mp4",
  "is_dir": false,
  "extension": "mp4"
}
```
</details>

## ImageInfo
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `file_name` | _String_ |  |
| `file_fullname` | _String_ |  |
| `file_relative_path` | _String_ |  |
| `file_path` | _String_ |  |
| `is_dir` | _Boolean_ |  |
| `extension` | _String_ |  |
| `properties` | _Object_ |  |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "file_name": "file.jpg",
  "file_fullname": "folder\\file.jpg",
  "file_relative_path": "image\\folder\\file.jpg",
  "file_path": "C:\\Holyrics\\Holyrics\\files\\media\\image\\folder\\file.jpg",
  "is_dir": false,
  "extension": "jpg"
}
```
</details>

## FileInfo
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `file_name` | _String_ |  |
| `file_fullname` | _String_ |  |
| `file_relative_path` | _String_ |  |
| `file_path` | _String_ |  |
| `is_dir` | _Boolean_ |  |
| `extension` | _String_ |  |
| `properties` | _Object_ |  |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "file_name": "file.txt",
  "file_fullname": "folder\\file.txt",
  "file_relative_path": "file\\folder\\file.txt",
  "file_path": "C:\\Holyrics\\Holyrics\\files\\media\\file\\folder\\file.txt",
  "is_dir": false,
  "extension": "txt"
}
```
</details>

## AutomaticPresentationInfo
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `name` | _String_ |  |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "name": "name"
}
```
</details>

## AnnouncementInfo
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _Number_ |  |
| `name` | _String_ |  |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "id": 0,
  "name": "name"
}
```
</details>

## SongSlideInfo
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID da música |
| `slide_index` | _Number_ |  |
| `slide_total` | _Number_ |  |
| `slide_description` | _String_ |  |
| `slide_show_index` | _Number_ |  |
| `slide_show_total` | _Number_ |  |
| `title` | _String_ | Título da música |
| `artist` | _String_ | Artista da música |
| `author` | _String_ | Autor da música |
| `note` | _String_ | Anotação da música |
| `copyright` | _String_ | Copyright da música |
| `key` | _String_ | Tom da música.<br>Pode ser: `C` `C#` `Db` `D` `D#` `Eb` `E` `F` `F#` `Gb` `G` `G#` `Ab` `A` `A#` `Bb` `B` `Cm` `C#m` `Dbm` `Dm` `D#m` `Ebm` `Em` `Fm` `F#m` `Gbm` `Gm` `G#m` `Abm` `Am` `A#m` `Bbm` `Bm` |
| `bpm` | _Number_ | BPM da música |
| `time_sig` | _String_ | Tempo da música.<br>Pode ser: `2/2` `2/4` `3/4` `4/4` `5/4` `6/4` `3/8` `6/8` `7/8` `9/8` `12/8` |
| `text` | _String_ |  |
| `comment` | _String_ |  |
| `extra` | _String_ |  |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "id": "0",
  "slide_index": 2,
  "slide_total": 8,
  "slide_description": "",
  "slide_show_index": 2,
  "slide_show_total": 12,
  "title": "",
  "artist": "",
  "author": "",
  "note": "",
  "copyright": "",
  "key": "",
  "bpm": 0.0,
  "time_sig": "",
  "text": "",
  "comment": "",
  "extra": ""
}
```
</details>

## TextSlideInfo
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do texto |
| `title` | _String_ | Título do texto |
| `text` | _String_ |  |
| `comment` | _String_ |  |
| `folder` | _String_ |  |
| `slide_index` | _String_ |  |
| `slide_total` | _String_ |  |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "id": "",
  "title": "",
  "text": "",
  "comment": "",
  "folder": "",
  "slide_index": 2,
  "slide_total": 8
}
```
</details>

## PPTInfo
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `file_name` | _String_ |  |
| `file_fullname` | _String_ |  |
| `file_relative_path` | _String_ |  |
| `file_path` | _String_ |  |
| `is_dir` | _Boolean_ |  |
| `extension` | _String_ |  |
| `properties` | _Object_ |  |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "file_name": "file.txt",
  "file_fullname": "folder\\file.txt",
  "file_relative_path": "file\\folder\\file.txt",
  "file_path": "C:\\Holyrics\\Holyrics\\files\\media\\file\\folder\\file.txt",
  "is_dir": false,
  "extension": "txt"
}
```
</details>

## PPTSlideInfo
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `file_name` | _String_ |  |
| `slide_number` | _Number_ |  |
| `slide_total` | _Number_ |  |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "file_name": "name",
  "slide_number": 1,
  "slide_total": 10
}
```
</details>

## ThemeInfo
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _Number_ |  |
| `name` | _String_ |  |
| `from_user_list` | _Boolean_ |  |
| `tags` | _Array&lt;String&gt;_ |  |
| `bpm` | _String_ |  |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "id": 0,
  "name": "name",
  "from_user_list": true,
  "bpm": "0"
}
```
</details>

## BackgroundInfo
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `type` | _String_ | `THEME` `MY_VIDEO` `MY_IMAGE` `VIDEO` `IMAGE` |
| `id` | _Number_ |  |
| `name` | _String_ |  |
| `from_user_list` | _Boolean_ |  |
| `tags` | _Array&lt;String&gt;_ |  |
| `bpm` | _String_ |  |
| `color_map` | _Array&lt;Object&gt;_ |  |
| `color_map.*.hex` | _String_ | Cor no formato hexadecimal |
| `color_map.*.red` | _Number_ | Vermelho  `0 ~ 255` |
| `color_map.*.green` | _Number_ | Verde  `0 ~ 255` |
| `color_map.*.blue` | _Number_ | Azul  `0 ~ 255` |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "type": "MY_VIDEO",
  "id": 0,
  "name": "name",
  "from_user_list": true,
  "bpm": "0",
  "color_map": [
    {
      "hex": "000000",
      "red": 0,
      "green": 0,
      "blue": 0
    },
    {
      "hex": "000000",
      "red": 0,
      "green": 0,
      "blue": 0
    },
    {
      "hex": "000000",
      "red": 0,
      "green": 0,
      "blue": 0
    },
    {
      "hex": "000000",
      "red": 0,
      "green": 0,
      "blue": 0
    },
    {
      "hex": "000000",
      "red": 0,
      "green": 0,
      "blue": 0
    },
    {
      "hex": "000000",
      "red": 0,
      "green": 0,
      "blue": 0
    },
    {
      "hex": "000000",
      "red": 0,
      "green": 0,
      "blue": 0
    },
    {
      "hex": "000000",
      "red": 0,
      "green": 0,
      "blue": 0
    }
  ]
}
```
</details>

## TitleInfo
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `title` | _String_ |  |
| `subitem` | _Object_ |  |
| `title_index` | _Number_ |  |
| `subitem_index` | _Number_ |  |
| `playlist_index` | _Number_ |  |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "title": "",
  "title_index": -1,
  "subitem_index": -1,
  "playlist_index": -1
}
```
</details>

## WebcamInfo
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `name` | _String_ |  |
| `fps` | _Number_ |  |
| `width` | _Number_ |  |
| `height` | _Number_ |  |
| `mute` | _Boolean_ |  |
| `aspect_ratio` | _String_ |  |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "name": "name",
  "fps": 30.0,
  "width": 1280,
  "height": 720,
  "mute": false,
  "aspect_ratio": "1:1"
}
```
</details>

## CountdownInfo
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `time` | _String_ |  |
| `exact_time` | _Boolean_ |  |
| `text_before` | _String_ |  |
| `text_after` | _String_ |  |
| `zero_fill` | _Boolean_ |  |
| `countdown_relative_size` | _Number_ |  |
| `hide_zero_minute` | _Boolean_ |  |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "time": "",
  "exact_time": false,
  "text_before": "",
  "text_after": "",
  "zero_fill": false,
  "countdown_relative_size": 0,
  "hide_zero_minute": false
}
```
</details>

## AutomaticPresentationSlideInfo
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ |  |
| `slide_index` | _Number_ |  |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "id": "filename.ap",
  "slide_index": 2
}
```
</details>

## PresentationModifierInfoInfo
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `type` | _String_ | `WALLPAPER` `BLANK_SCREEN` `BLACK_SCREEN` |
| `name` | _String_ | Nome do item |
| `shortcut` | _String_ | `F8` `F9` `F10` |
| `presentation_type` | _String_ | `SONG` `TEXT` `VERSE` `ANY_ITEM` |
| `state` | _Boolean_ |  |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "type": "BLANK_SCREEN",
  "name": "Blank Screen",
  "shortcut": "F9",
  "presentation_type": "SONG",
  "state": false
}
```
</details>

## NewChatMessageInfo
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ |  |
| `datetime` | _Number_ |  |
| `user_id` | _String_ |  |
| `name` | _String_ |  |
| `message` | _String_ |  |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "id": "1742142790725",
  "datetime": 1742142790725,
  "user_id": "-1qfe9t8wtrsb6p5",
  "name": "example",
  "message": "example"
}
```
</details>

## VersePresentationChangedInfo
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ |  |
| `book` | _Number_ |  |
| `chapter` | _Number_ |  |
| `verse` | _Number_ |  |
| `reference` | _String_ |  |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "id": "01001001",
  "book": 1,
  "chapter": 1,
  "verse": 1,
  "reference": "Gn 1:1"
}
```
</details>

## PlaylistChangedInfo
<details>
  <summary>Ver exemplo</summary>

```json
{}
```
</details>

## FileModifiedInfo
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `media_type` | _String_ |  |
| `action` | _String_ |  |
| `name` | _String_ |  |
| `is_dir` | _Boolean_ |  |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "media_type": "image",
  "action": "created",
  "name": "image.jpg",
  "is_dir": false
}
```
</details>

## PlayerProgressInfo
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `time` | _Number_ |  |
| `total` | _Number_ |  |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "time": 0,
  "total": 60000
}
```
</details>

## DrawLotsItemDrawnInfo
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `collection_type` | _String_ |  |
| `drawn_items` | _Array&lt;String&gt;_ |  |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "collection_type": "text"
}
```
</details>
