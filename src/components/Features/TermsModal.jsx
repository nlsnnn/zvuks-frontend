import { useEffect, useRef, useState } from "react";

export const TermsModal = ({ onClose, onAccept }) => {
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const el = contentRef.current;
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
        setScrolledToBottom(true);
      }
    };

    const el = contentRef.current;
    if (el) el.addEventListener("scroll", handleScroll);

    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 backdrop-blur-sm bg-white/70"></div>
      <div className="glass-section w-full max-w-xl relative z-10">
        <h2 className="text-xl font-bold mb-4">Пользовательское соглашение</h2>
        <div
          ref={contentRef}
          className="h-64 overflow-y-auto border p-4 text-sm space-y-2 bg-white rounded-md"
        >
          <p><strong>1. Общие положения</strong></p>
          <p>1.1. Настоящее Соглашение регулирует порядок использования платформы Zvuks (далее — Сервис).</p>
          <p>1.2. Зарегистрировавшись в Сервисе, пользователь подтверждает, что ознакомился и полностью согласен с условиями настоящего Соглашения.</p>
          <p><strong>2. Права на загружаемый контент</strong></p>
          <p>2.1. Пользователь подтверждает, что загружаемый им звуковой контент (аудиофайлы, обложки, тексты и т.д.):</p>
          <p>Является его собственной интеллектуальной собственностью,</p>
          <p>ИЛИ</p>
          <p>Загружается с разрешения правообладателя,</p>
          <p>ИЛИ</p>
          <p>Является общественным достоянием (public domain) или распространяется по лицензии, разрешающей использование (Creative Commons и т.п.).</p>
          <p>2.2. Пользователь несет полную ответственность за нарушение авторских прав при загрузке и распространении контента через Сервис.</p>

          <p><strong>3. Удаление и модерация контента</strong></p>
          <p>3.1. Администрация оставляет за собой право удалять или ограничивать доступ к любому контенту при наличии жалоб или подозрений на нарушение авторских прав.</p>
          <p>3.2. При поступлении обоснованной жалобы от правообладателя или третьего лица, контент будет временно скрыт до выяснения обстоятельств.</p>
          <p><strong>4. Ограничение ответственности Сервиса</strong></p>
          <p>4.1. Сервис предоставляет только техническую платформу для размещения контента пользователями.</p>
          <p>4.2. Сервис не несет ответственности за действия пользователей, но при этом готов сотрудничать с правообладателями для решения спорных ситуаций.</p>
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <button
            disabled={!scrolledToBottom}
            onClick={() => {
              onAccept();
              onClose();
            }}
            className={`px-4 py-2 rounded bg-blue-600 text-white transition ${
              !scrolledToBottom ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            Принять
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border hover:bg-gray-100"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>  );
};
