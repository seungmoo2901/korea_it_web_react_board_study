import { useQueryClient } from "@tanstack/react-query";

function ProtectedRoute({ children }) {
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData(["getPrincipal"]);

  if (principalData == undefined) {
    alert("로그인이 필요합니다.");
    window.location.href = "/auth/signin"; //홈으로 이동
    return;
  }
  return children; //children인 write 컴포넌트 보여줌 
}

export default ProtectedRoute;
