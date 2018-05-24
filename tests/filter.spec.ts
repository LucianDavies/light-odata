import "jest"
import { ODataFilter } from "../src";

describe("OData Filter Test", () => {

  test("ODataFilter.eqString", () => {
    const filter = ODataFilter.newFilter().field("Name").eqString("test string")
    expect(filter.build()).toEqual("Name eq 'test string'")
  })

  test("ODataFilter.group", () => {
    const filter = ODataFilter.newFilter().group(
      ODataFilter.newFilter().fieldIn("Name", ["test string1", "test string2"])
    )
    expect(filter.build()).toEqual("(Name eq 'test string1' or Name eq 'test string2')")
  })

  test('ODataFilter.and(simple)', () => {
    const filter = ODataFilter.newFilter()
      .field("Name").eq("'test string1'").and()
      .field("Name2").eqString("test string2")
    expect(filter.build()).toEqual("Name eq 'test string1' and Name2 eq 'test string2'")
  })

  test('ODataFilter.and(complex)', () => {
    const filter = ODataFilter.newFilter().field("Name").eq("'test string1'").and(
      ODataFilter.newFilter().fieldIn("Name", ["test string1", "test string2"])
    )
    expect(filter.build())
      .toEqual("(Name eq 'test string1') and (Name eq 'test string1' or Name eq 'test string2')")
  })

  test('ODataFilter.inPeriod', () => {
    const filter = ODataFilter.newFilter()
      .field("Name").eq("'test string1'").and()
      .inPeriod("CreationDateTime", new Date("2018-01-24T12:43:31.839Z"), new Date("2018-05-24T12:43:31.839Z"))
    expect(filter.build())
      .toEqual("Name eq 'test string1' and (CreationDateTime gt datetime'2018-01-24T12:43:31.839Z' and CreationDateTime lt datetime'2018-05-24T12:43:31.839Z')")
  })



})