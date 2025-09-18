import { useState, useRef, useEffect } from "react";
import FormData from "../components/formData/FormData";
import FormLid from "../components/formLid/FormLid";
import AllData from "../components/allData/AllData";

const FormsPage = () => {
  const [activeForm, setActiveForm] = useState<"order" | "expenses" | "all">("order");
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  // Обновляем высоту контейнера
  useEffect(() => {
    if (containerRef.current) {
      const form = containerRef.current.querySelector<HTMLDivElement>(
        `.${activeForm}-form`
      );
      if (form) setContainerHeight(form.offsetHeight);
    }
  }, [activeForm]);

  // свайпы
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 50) {
        if (activeForm === "order") setActiveForm("expenses");
        else if (activeForm === "expenses") setActiveForm("all");
      } else if (diff < -50) {
        if (activeForm === "all") setActiveForm("expenses");
        else if (activeForm === "expenses") setActiveForm("order");
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Кнопки на десктопе */}
      <div className="hidden md:flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-xl font-semibold ${
            activeForm === "order" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveForm("order")}
        >
          Данные заказа
        </button>
        <button
          className={`px-4 py-2 rounded-xl font-semibold ${
            activeForm === "expenses" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveForm("expenses")}
        >
          Затраты за день
        </button>
        <button
          className={`px-4 py-2 rounded-xl font-semibold ${
            activeForm === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveForm("all")}
        >
          Все данные
        </button>
      </div>

      {/* мобильный свайп */}
      <div
        className="md:hidden relative w-full overflow-hidden"
        ref={containerRef}
        style={{ height: containerHeight, transition: "height 0.3s ease" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-300"
          style={{
            width: "300%",
            transform:
              activeForm === "order"
                ? "translateX(0%)"
                : activeForm === "expenses"
                ? "translateX(-33.3%)"
                : "translateX(-66.6%)",
          }}
        >
          <div className="w-full flex justify-center order-form">
            <FormLid />
          </div>
          <div className="w-full flex justify-center expenses-form">
            <FormData />
          </div>
          <div className="w-full flex justify-center all-form">
            <AllData />
          </div>
        </div>
      </div>

      {/* десктоп отображение */}
      <div className="hidden md:block">
        {activeForm === "order" && <FormLid />}
        {activeForm === "expenses" && <FormData />}
        {activeForm === "all" && <AllData />}
      </div>
    </div>
  );
};

export default FormsPage;


