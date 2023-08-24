class CodeBuilder {
  constructor(className) {
    this.fields = [];
    this.className = className;
  }

  addField(name) {
    this.fields.push(name);

    return this;
  }

  toString() {
    let code = `class ${this.className}`;

    if (this.fields.length) {
      code += ` {\n  constructor(${this.fields.join(", ")}) {`;

      code += this.fields.map((f) => `\n    this.${f} = ${f};`);

      code += "\n  }\n}";
    } else {
      code += "{}";
    }

    return code;
  }
}

let cb = new CodeBuilder("Person");
cb.addField("name").addField("age");
console.log(cb.toString());
