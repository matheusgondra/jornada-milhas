import { AddTestimonialRepository } from "../../../../src/data/protocols";
import { DbAddTestimonial } from "../../../../src/data/use-cases";
import { AddTestimonialModel, TestimonialModel } from "../../../../src/domain";

const makeAddTestimonialRepositoryStub = (): AddTestimonialRepository => {
	class AddTestimonialRepositoryStub implements AddTestimonialRepository {
		async add(data: AddTestimonialModel): Promise<TestimonialModel> {
			return {
				id: 1,
				name: "any_name",
				photo: "any_photo",
				testimonial: "any_testimonial"
			};
		}
	}
	return new AddTestimonialRepositoryStub();
};

interface SutTypes {
	sut: DbAddTestimonial;
	addTestimonialRepositoryStub: AddTestimonialRepository;
}

const makeSut = (): SutTypes => {
	const addTestimonialRepositoryStub = makeAddTestimonialRepositoryStub();
	const sut = new DbAddTestimonial(addTestimonialRepositoryStub);
	return {
		sut,
		addTestimonialRepositoryStub
	};
};

const makeFakeData = (): AddTestimonialModel => ({
	name: "any_name",
	photo: "any_photo",
	testimonial: "any_testimonial"
});

describe("DbAddTestimonial", () => {
	it("Should call AddTestimonialRepository with correct values", async () => {
		const { sut, addTestimonialRepositoryStub } = makeSut();
		const addSpy = jest.spyOn(addTestimonialRepositoryStub, "add");
		await sut.add(makeFakeData());
		expect(addSpy).toBeCalledWith(makeFakeData());
	});
});
