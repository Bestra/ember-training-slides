import Contact from "contact-manager/models/contact";
module('Unit: Contact');

test("it has a default email", function() {
  var contact = Contact.create();
  ok(true, "Ok asserts that true things are true");
  ok("Truthy thing", "Truthy things are true too");
  equal(contact.get('email'),
        "contact@example.com",
        "The default email is @example.com");

  contact.set('email', "steve@dave.biz");
  equal(contact.get('email'),
        "steve@dave.biz",
        "It can change the email");
});
