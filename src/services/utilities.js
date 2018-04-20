import csvtojson from 'csvtojson';
import moment from 'moment';

const types = [
  {
    name: 'HAVI ZÁRLATI DÍJ',
    date: 11,
    category: 'Egyéb kiadás',
    tag: 'banki díj',
  },
  {
    name: 'IDŐSZAKOS KÖLTSÉGEK',
    date: 11,
    category: 'Egyéb kiadás',
    tag: 'banki díj',
  },
  {
    name: 'OTPdirekt HAVIDÍJ',
    date: 11,
    category: 'Egyéb kiadás',
    tag: 'banki díj',
  },
  {
    name: 'KÉSZPÉNZFELVÉT ATM-BŐL',
    date: 11,
    category: 'Egyéb kiadás',
    tag: 'készpénz felvétel',
  },
  {
    name: 'VÁSÁRLÁS KÁRTYÁVAL',
    date: 11,
    place: 9,
    category: 'byPlace',
  },
  {
    name: 'NAPKÖZBENI ÁTUTALÁS',
    date: 4,
    place: 8,
    category: 'byPlace',
  },
  {
    name: 'ÁTUTALÁS (OTP-N BELÜL)',
    date: 4,
    place: 8,
    category: 'byPlace',
  },
];

const getKoinCategory = (categoryName, koinCategories) => {
  let category = koinCategories.filter(item =>
    item.name === categoryName &&
    item.is_recurring === 0
  );
  category = category.length > 0 ? category[0] : undefined;

  return category;
};

const getCategory = (place, koinCategories) => {
  const category = 'Egyéb kiadás';

  // TODO: categorize

  return getKoinCategory(category, koinCategories);
};

const getDate = (str, str2) => {
  const date = str.match(/[0-9]{4}\.[0-9]{2}\.[0-9]{2}/);

  if (date) {
    return moment(`${date[0]}.`).format('YYYY-MM-DD');
  }

  return moment(str2).format('YYYY-MM-DD');
};

const normalize = (data, koinCategories) => {
  let category;
  let scheme;

  if (data[2] > 0) {
    category = getKoinCategory('Fizetés', koinCategories);
  } else {
    scheme = types.filter(item => item.name === data[12])[0];

    if (scheme) {
      if (scheme.category === 'byPlace') {
        category = getCategory(data[scheme.place], koinCategories);
      }
      else {
        category = getKoinCategory(scheme.category, koinCategories);
      }
    } else {
      category = getKoinCategory('Egyéb kiadás', koinCategories);
    }
  };

  return {
    value: data[2],
    currency: data[3],
    date: getDate(data[11], data[4]),
    place: scheme ? data[scheme.place] : undefined,
    type: data[12],
    category,
  };
};

export const converToObject = (csvStr, koinCategories) => {
  const data = [];
  return new Promise((resolve) => {
    csvtojson({ noheader: true, delimiter: ';' })
      .fromString(csvStr)
      .on('csv', (csvRow) => {
        data.push(normalize(csvRow, koinCategories));
      })
      .on('done', () => {
        resolve(data);
      });
  });
};
