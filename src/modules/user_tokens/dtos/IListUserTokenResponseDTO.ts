import IListUserResponseDTO from "../../user/dtos/IListUserResponseDTO";

export default interface IListUserTokenResponseDTO {
  user: IListUserResponseDTO;
  token: string;
  refreshToken: string;
}
