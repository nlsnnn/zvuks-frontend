import { Header } from "../../Header/Header";

export const ChatsPage = () => {
  return (
    <>
    <Header />
      <main class="container mx-auto mt-8">
        <div class="flex flex-col items-center lg:items-start">
          <h2 class="text-3xl font-semibold">Чаты</h2>
          <div class="flex gap-4 flex-col md:flex-row mt-6">
            <input
              type="text"
              class="py-1.5 px-4 rounded-lg border border-black text-xs outline-none"
              placeholder="Имя..."
            />
            <button class="py-1 px-8 rounded-lg bg-blue-600  text-white font-medium hover:bg-blue-500 transition">
              Найти
            </button>
          </div>
        </div>

        <div class="flex flex-col gap-4 lg:gap-0  lg:flex-row mt-4">
          <div class="flex lg:flex-col items-center justify-center lg:justify-normal gap-3 flex-wrap lg:items-start w-full lg:w-1/6 ">
            <div class="px-2 lg:w-4/5 lg:justify-around py-0.5 flex items-center gap-3 cursor-pointer rounded hover:bg-gray-200 transition border border-black">
              <img
                src="./../img/timmy.png"
                alt="carson"
                class="rounded-full w-12 h-12 object-cover"
              />
              <span>ogtimmy</span>
            </div>
            <div class="px-2 lg:w-4/5 lg:justify-around py-0.5 flex items-center gap-3 cursor-pointer rounded hover:bg-gray-200 transition border border-black">
              <img
                src="./../img/rosticson.jpg"
                alt="carson"
                class="rounded-full w-12 h-12 object-cover"
              />
              <span>oblik</span>
            </div>
            <div class="px-2 lg:w-4/5 lg:justify-around py-0.5 flex items-center gap-3 cursor-pointer rounded hover:bg-gray-200 transition border border-black">
              <img
                src="./../img/lazer.jpg"
                alt="carson"
                class="rounded-full w-12 h-12 object-cover"
              />
              <span>lazerdimon</span>
            </div>
            <div class="px-2 lg:w-4/5 lg:justify-around py-0.5 flex items-center gap-3 cursor-pointer rounded hover:bg-gray-200 transition border border-black">
              <img
                src="./../img/slon.jpg"
                alt="carson"
                class="rounded-full w-12 h-12 object-cover"
              />
              <span>elephon</span>
            </div>
            <div class="px-2 lg:w-4/5 lg:justify-around py-0.5 flex items-center gap-3 cursor-pointer rounded hover:bg-gray-200 transition border border-black">
              <img
                src="./../img/rhino.jpg"
                alt="carson"
                class="rounded-full w-12 h-12 object-cover"
              />
              <span>bigrhino</span>
            </div>
            <div class="px-2 lg:w-4/5 lg:justify-around py-0.5 flex items-center gap-3 cursor-pointer rounded hover:bg-gray-200 transition border border-black">
              <img
                src="./../img/black.jpg"
                alt="carson"
                class="rounded-full w-12 h-12 object-cover"
              />
              <span>lilmouse</span>
            </div>
            <div class="px-2 lg:w-4/5 lg:justify-around py-0.5 flex items-center gap-3 cursor-pointer rounded hover:bg-gray-200 transition border border-black">
              <img
                src="./../img/mus3.jpg"
                alt="carson"
                class="rounded-full w-12 h-12 object-cover"
              />
              <span>chopskii</span>
            </div>
          </div>
          <div class="p-2 flex flex-col  rounded border border-black w-full">
            <div class="px-2 py-2 flex items-center gap-3 border-b border-black cursor-pointer">
              <img
                src="./../img/timmy.png"
                alt="carson"
                class="rounded-full w-12 h-12"
              />
              <span>ogtimmy</span>
            </div>
            <div class="flex flex-col flex-grow h-screen bg-white shadow-xl rounded-lg overflow-hidden">
              <div class="flex flex-col flex-grow h-0 p-4 overflow-auto">
                <div class="flex w-full mt-2 space-x-3 max-w-xs">
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                  <div>
                    <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                      <p class="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </div>
                    <span class="text-xs text-gray-500 leading-none">
                      2 min ago
                    </span>
                  </div>
                </div>
                <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                  <div>
                    <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                      <p class="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod.
                      </p>
                    </div>
                    <span class="text-xs text-gray-500 leading-none">
                      2 min ago
                    </span>
                  </div>
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                </div>
                <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                  <div>
                    <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                      <p class="text-sm">Lorem ipsum dolor sit amet.</p>
                    </div>
                    <span class="text-xs text-gray-500 leading-none">
                      2 min ago
                    </span>
                  </div>
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                </div>
                <div class="flex w-full mt-2 space-x-3 max-w-xs">
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                  <div>
                    <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                      <p class="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.{" "}
                      </p>
                    </div>
                    <span class="text-xs text-gray-500 leading-none">
                      2 min ago
                    </span>
                  </div>
                </div>
                <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                  <div>
                    <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                      <p class="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.{" "}
                      </p>
                    </div>
                    <span class="text-xs text-gray-500 leading-none">
                      2 min ago
                    </span>
                  </div>
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                </div>
                <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                  <div>
                    <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                      <p class="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt.
                      </p>
                    </div>
                    <span class="text-xs text-gray-500 leading-none">
                      2 min ago
                    </span>
                  </div>
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                </div>
                <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                  <div>
                    <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                      <p class="text-sm">Lorem ipsum dolor sit amet.</p>
                    </div>
                    <span class="text-xs text-gray-500 leading-none">
                      2 min ago
                    </span>
                  </div>
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                </div>
                <div class="flex w-full mt-2 space-x-3 max-w-xs">
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                  <div>
                    <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                      <p class="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.{" "}
                      </p>
                    </div>
                    <span class="text-xs text-gray-500 leading-none">
                      2 min ago
                    </span>
                  </div>
                </div>
                <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                  <div>
                    <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                      <p class="text-sm">Lorem ipsum dolor sit.</p>
                    </div>
                    <span class="text-xs text-gray-500 leading-none">
                      2 min ago
                    </span>
                  </div>
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                </div>
              </div>
              <div class="bg-gray-300 p-4">
                <input
                  class="flex items-center h-10 w-full rounded px-3 text-sm"
                  type="text"
                  placeholder="Type your message…"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
