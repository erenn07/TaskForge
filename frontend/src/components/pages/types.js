// TypeScript tanımlamalarını JavaScript'e dönüştürüyoruz

// export type Id = string | number;
// export type Column = { id: Id; title: string; };
// export type Task = { id: Id; columnId: Id; content: string; };

// JavaScript versiyonu
// Tip belirtmeleri olmadan, sadece nesneleri tanımlıyoruz.

// Id tipini string veya number olarak kabul ediyoruz
const Id = String;

// Column nesnesi tanımı
const Column = {
  id: Id,
  title: "",
};

// Task nesnesi tanımı
const Task = {
  id: Id,
  columnId: Id,
  content: "",
};

// Bu nesneleri kullanabilirsiniz
const exampleColumn = {
  id: "exampleId",
  title: "Example Title",
};

const exampleTask = {
  id: "taskId",
  columnId: "exampleId",
  content: "Example Content",
};

// Eğer Id tipini sadece string olarak kullanmak istiyorsanız:
// const Id = String;
// ve her yerde Id tipi kullanıldığında bu String değerini kullanabilirsiniz.
