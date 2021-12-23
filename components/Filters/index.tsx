import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useFilter } from "../../providers/filterProvider";
import { Container } from "../Container";
import { Close } from "../Icons/Close";
import { filterColors, filterTags } from "./mockFitlers";
import styles from "./styles.module.css";

export const Filters: FC = () => {
  const { query } = useRouter();

  const [showDetailed, toggleDetailed] = useState(false);

  const { onQueryChange, onClear, onRangeChange } = useFilter();

  const tags = query.tags ? (query.tags as string).split(";") : [];

  const colors = query.colors ? (query.colors as string).split(";") : [];

  const [min, max] = query.prices ? (query.prices as string).split(";") : [];

  return (
    <Container>
      <div className="flex relative py-2">
        <div className="mx-auto">
          <ul className="list-none flex">
            <li className="mx-8">
              <button
                className={`text-sm text-back border-black uppercase ${
                  tags.length === 0 ? "border-b-2 " : ""
                }`}
                onClick={() => {
                  onQueryChange("all", "tags");
                }}
              >
                All
              </button>
            </li>
            {filterTags.map(({ id, name }) => {
              const isTagSelected = tags.some((tag) => tag === name);

              return (
                <li
                  key={id}
                  className={`mx-8`}
                  onClick={() => {
                    onQueryChange(name, "tags");
                  }}
                >
                  <button
                    className={`text-sm text-back border-black uppercase ${
                      isTagSelected ? "border-b-2 " : ""
                    }`}
                  >
                    {name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="absolute right-0">
          <button
            onClick={() => toggleDetailed(true)}
            className="text-sm text-back border-black uppercase"
          >
            Filters
          </button>
          {showDetailed && (
            <div className="absolute top-10 right-0">
              <div className={`${styles.modal} bg-white relative`}>
                <div className={`${styles.close} absolute flex`}>
                  <div className="mr-4">
                    <button
                      className="text-sm text-back border-black uppercase"
                      onClick={() => onClear()}
                    >
                      Clear filters
                    </button>
                  </div>
                  <button onClick={() => toggleDetailed(false)}>
                    <Close />
                  </button>
                </div>
                <div className="flex">
                  <span className="text-sm text-back border-black uppercase">
                    Colour
                  </span>

                  <div className="ml-2 flex items-center">
                    {filterColors.map(({ hex, name, id }) => {
                      const isColorSelected = colors.some(
                        (color) => color === name
                      );

                      return (
                        <div
                          style={{ background: hex }}
                          className={`${styles.color} ${
                            isColorSelected ? styles.activeColor : ""
                          } rounded-full mx-1 cursor-pointer`}
                          key={id}
                          onClick={() => onQueryChange(name, "colors")}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-back border-black uppercase">
                    Price
                  </span>
                  <div className="ml-2 flex items-center">
                    <input
                      type="text"
                      placeholder="min"
                      value={min || ""}
                      onChange={(event) => {
                        const { value } = event.target;

                        onRangeChange("min", value);
                      }}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 w-16 outline-0"
                    />
                    -
                    <input
                      type="text"
                      placeholder="max"
                      value={max || ""}
                      onChange={(event) => {
                        const { value } = event.target;

                        onRangeChange("max", value);
                      }}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 w-16 outline-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};
