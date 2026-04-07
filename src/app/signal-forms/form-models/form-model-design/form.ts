import { Component, Injectable, input, linkedSignal, ResourceRef, signal } from '@angular/core';
import { disabled, form, hidden, schema } from '@angular/forms/signals';

// Match data types to UI controls:
// Although the size options look numeric, <select> elements
// work with string values, so size should be modeled as a string.
// An <input type="number"> on the other hand, does work with numbers, so quantity can be modeled as a number.
interface BeverageOrderFormModel {
  size: string; // Bound to: <select> (option values: "6", "12", "24")
  quantity: number; // Bound to: <input type="number">
}

// https://angular.dev/guide/forms/signals/model-design
@Injectable({ providedIn: 'root' })
export class FormService {
  // Provide initial values for every field in your model
  // Avoid undefined: A form model must not contain undefined
  // values or properties. In Signal Forms the structure of
  // the form is derived from the structure of the model, and
  // undefined signifies the absence of a field, rather than a
  // field with an empty value. This means you must also avoid
  // optional fields (e.g., {property?: string}), as they
  // implicitly allow undefined.
  // To represent a property with an empty value in your form model,
  // use a value that the UI control understands to mean "empty"
  // (e.g. "" for a <input type="text">). If you're designing a
  // custom UI control, null often works as a good value to signify "empty".

  // Avoid - Using null as empty value for complex object
  createAccountFormBad = form<{ drink: BeverageOrderFormModel } | null>(signal(null));
  createAccountFormGood = form<{ drink: BeverageOrderFormModel }>(
    signal({
      drink: {
        size: '',
        quantity: 0,
      },
    }),
  );
}

interface BillPayFormModel {
  name: string;
  method: {
    type: string;
    card: {
      cardNumber: string;
      securityCode: string;
      expiration: string;
    };
    bank: {
      accountNumber: string;
      routingNumber: string;
    };
  };
}
@Injectable({ providedIn: 'root' })
export class BillPayFormService {
  // The best way to handle this (conditional paths based on previous user input)
  // is to use a form model with a static structure that includes fields for all
  // potential payment methods. In our schema, we can hide or disable the fields
  // that are not currently available.
  billPaySchema = schema<BillPayFormModel>((billPay) => {
    // Hide credit card details when user has selected a method other than credit card.
    hidden(billPay.method.card, ({ valueOf }) => valueOf(billPay.method.type) !== 'card');
    // Hide bank account details when user has selected a method other than bank account.
    hidden(billPay.method.bank, ({ valueOf }) => valueOf(billPay.method.type) !== 'bank');
  });
  // AVOID dynamic stricture, like a union of one method and the other
  // EXCEPTIONS - arrays, fields that are treated atomically by the UI control (location complex object)
}

// Translating between form model and domain model:
// https://angular.dev/guide/forms/signals/model-design#translating-between-form-model-and-domain-model
//
// interface MyDomainModel { ... }
// interface MyFormModel { ... }
// // Instance of `MyFormModel` populated with empty input (e.g. `''` for string inputs, etc.)
// const EMPTY_MY_FORM_MODEL: MyFormModel = { ... };
// function domainModelToFormModel(domainModel: MyDomainModel): MyFormModel { ... }
// function formModelToDomainModel(formModel: MyFormModel): MyDomainModel { ... }

// See doc for example, somewhat detailed but extremely important
