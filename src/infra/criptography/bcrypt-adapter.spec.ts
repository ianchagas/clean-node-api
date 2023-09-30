import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcrypt-adapter";

jest.mock("bcrypt", () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve("mocked_hash"));
  },
}));

const salt = 12;

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt);
};

describe("Bcrypt Adapter", () => {
  test("Should call bcrypt with correct values", async () => {
    const hashSpy = jest.spyOn(bcrypt, "hash");
    const sut = makeSut();
    await sut.encrypt("any_value");

    expect(hashSpy).toHaveBeenCalledWith("any_value", salt);
  });

  test("Should return a hash on success", async () => {
    const sut = makeSut();
    const hash = await sut.encrypt("any_value");

    expect(hash).toBe("mocked_hash");
  });

  test("Should throw if bcrypt throws", async () => {
    const sut = makeSut();

    /*
     *  Método spyOn passado na aula, está com erro.
     *  Como o método a ser mockado tem muitas sobrecargas, o mock tenta entender que eu quero mockar alguma dessas, então o certo é trocar
     *  Ou para mockImplementationOnce que a gente pode mockar o que quiser do jeito que quiser
     *  Ou setar o spyOn com tipagem any e string, para ele receber qualquer coisa (reject da promise) e o erro
     *
     *  Repassado na aula.:
     *
     *  jest
     *    .spyOn(bcrypt, "hash")
     *    .mockReturnValueOnce(
     *      new Promise((resolve, reject) => reject(new Error()))
     *    );
     *
     *
     *  spyOn com tipagem.:
     *
     *  jest
     *     .spyOn<any, string>(bcrypt, "hash")
     *     .mockReturnValueOnce(
     *       new Promise((resolve, reject) => reject(new Error()))
     *     );
     *
     *  Vou usar o mockImplementationOnce para setar um erro direto no meu teste
     */

    jest.spyOn(bcrypt, "hash").mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.encrypt("any_value");

    await expect(promise).rejects.toThrow();
  });
});
