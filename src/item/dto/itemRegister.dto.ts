import { IsEmpty, IsOptional, IsString } from 'class-validator';

export type UseType = 'Y' | 'N';

export class itemRegisterDto {
  @IsOptional()
  STTEMNT_NO: string;

  @IsOptional()
  ENTRPS: string;

  @IsOptional()
  PRDUCT: string;

  @IsOptional()
  REGIST_DT: string;

  @IsOptional()
  DISTB_PD: string;

  @IsOptional()
  SUNGSANG: string;

  @IsOptional()
  SRV_USE: string;

  @IsOptional()
  PRSRV_PD: string;

  @IsOptional()
  INTAKE_HINT1: string;

  @IsOptional()
  MAIN_FNCTN: string;

  @IsOptional()
  BASE_STANDARD: string;

  @IsOptional()
  PRMS_STANDARD: string;

  @IsOptional()
  Draft: string;

  useYN: UseType;
}
