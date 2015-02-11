import Contact from 'contact-manager/models/contact'

var names = ['Lenora Baldree',
'Jacqualine Strickler',
'Toney Nadeau',
'Joan Pinnock',
'Hosea Barberio',
'Thalia Ruel',
'Candy Ballantine',
'Carisa Friedlander',
'Enedina Fetty',
'Tad Frost',
'Sheree Getz',
'Divina Tawney',
'Sun Felkins',
'Flavia Ranney',
'Noelia Deanda',
'Milan Lary',
'Candis Salomone',
'Tammi Coryell',
'Fumiko Lafler',
'Idell Ervin'];

export default names.map((name, idx) => {
  var [firstName, lastName] = name.split(' ');
  var id = idx + 1
  return Contact.create({firstName, lastName, id});
})
