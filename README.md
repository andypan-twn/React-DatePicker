# React Date Picker

### Requirement

- browser:
  - Chrome
  - Edge
  - Firefox
  - Internet Explorer 11

### How to use

1. open `/index.html` or `/dist/index.html` file on your browser
2. enjoy!

### All Of Component Props Detail

1. `<DatePicker>` - entry component.

   | Name       | Type                 | Default | Description                                                                   |
   | ---------- | -------------------- | ------- | ----------------------------------------------------------------------------- |
   | selectDate | String               | today   | Date of selected.<br>Format: `yyyy-mm-dd` or any text match `ISO8601` format. |
   | onSelect   | Function(dateString) | N/A     | Callback function when user selected.                                         |

2. `<HeaderComponent>` - display year or month text.

   | Name         | Type   | Default | Description                                                                                     |
   | ------------ | ------ | ------- | ----------------------------------------------------------------------------------------------- |
   | displayState | Number | N/A     | Display type.<br> 1: `{year}`. <br> 2: `{start} - {end}`. <br> Other/Default: `{month} {year}`. |
   | start        | String | N/A     | Start of years.                                                                                 |
   | end          | String | N/A     | End of years.                                                                                   |
   | year         | String | N/A     | Current year.                                                                                   |
   | month        | String | N/A     | Current month.                                                                                  |

3. `<DateComponent>` - display date list.

   | Name     | Type              | Default | Description                               |
   | -------- | ----------------- | ------- | ----------------------------------------- |
   | year     | String            | N/A     | Target year.                              |
   | month    | String            | N/A     | Target month.                             |
   | select   | String            | ""      | Selected date. <br> Format: `yyyy-mm-dd`. |
   | onSelect | Function(dateStr) | N/A     | Callback function when user selected.     |

4. `<MonthComponent>` - display month list.

   | Name     | Type               | Default | Description                                                             |
   | -------- | ------------------ | ------- | ----------------------------------------------------------------------- |
   | select   | String             | ""      | Selected month. <br> Format: `m`. <br> NOTE: "0" => Jan, "1" => Feb ... |
   | onSelect | Function(monthStr) | N/A     | Callback function when user selected.                                   |

5. `<YearComponent>` - display year list.

   | Name     | Type              | Default | Description                           |
   | -------- | ----------------- | ------- | ------------------------------------- |
   | start    | String            | N/A     | Start of year. <br> Format: `yyyy`.   |
   | end      | String            | N/A     | End of year. <br> Format: `yyyy`.     |
   | select   | String            | ""      | Selected year. <br> Format: `yyyy`.   |
   | onSelect | Function(yearStr) | N/A     | Callback function when user selected. |

6. `<WeekComponent>` - display week text.

   | Name | Type | Default | Description |
   | ---- | ---- | ------- | ----------- |
   | N/A  | N/A  | N/A     | N/A         |

### Develop

#### Requirement

- node.js: 10.x

#### Start to develop

1. install npm package

   ```
   $ npm i
   ```

   - NOTE: Be careful with any errors message!

2. run local server
   ```
   $ npm run serve
   ```
3. use `http://localhost:3000/` on your browser

#### Build on local

1. install npm package
   ```
   $ npm i
   ```
   - NOTE: Be careful with any errors message!
2. run local server
   ```
   $ npm run build
   ```
