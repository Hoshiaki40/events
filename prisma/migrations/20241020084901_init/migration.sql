-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('ADMIN', 'PARENTS', 'TEACHERS', 'STUDENTS', 'CONSUMERS', 'DIRECTORS', 'SUPERVISOR', 'GENERAL_SUPERVISORS', 'ASSISTANT_DIRECTORS');

-- CreateEnum
CREATE TYPE "RoleAuthorizationType" AS ENUM ('SYSTEM', 'SCHOOL');

-- CreateEnum
CREATE TYPE "CertificationType" AS ENUM ('ACADEMIQUE', 'PEDAGOGIQUE');

-- CreateEnum
CREATE TYPE "ClientType" AS ENUM ('NURSERY', 'PRIMARY', 'COLLEGE', 'HIGH_SCHOOL');

-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('HOMME', 'FEMME');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PUBLIQUE', 'PRIVE');

-- CreateEnum
CREATE TYPE "Parcours" AS ENUM ('GENERAL', 'TECHNIQUE');

-- CreateEnum
CREATE TYPE "Mentions" AS ENUM ('PASSABLE', 'ASSEZ_BIEN', 'BIEN', 'TRES_BIEN');

-- CreateEnum
CREATE TYPE "ExamNoteType" AS ENUM ('TEST', 'EXAM');

-- CreateEnum
CREATE TYPE "RegistrationType" AS ENUM ('INSCRIPTION', 'REINSCRIPTION');

-- CreateEnum
CREATE TYPE "Relationship" AS ENUM ('PERE_FILS', 'MERE_FILS', 'PERE_FILLE', 'MERE_FILLE', 'FRERE_SOEUR', 'SOEUR_SOEUR', 'FRERE_FRERE', 'ONCLE_NEVEU', 'ONCLE_NIECE', 'TANTE_NEUVEU', 'TANTE_NIECE', 'COUSIN_COUSINE', 'AMIS');

-- CreateEnum
CREATE TYPE "Albums" AS ENUM ('angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('FRAIS_GENERAUX', 'FRAIS_SCOLARITE');

-- CreateEnum
CREATE TYPE "PaymentMode" AS ENUM ('ESPECE', 'CHEQUE', 'MOBILE_MONEY');

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "accessToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authorization" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "type" "RoleAuthorizationType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,

    CONSTRAINT "authorization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_authorization" (
    "id" TEXT NOT NULL,
    "authorizationId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "assignatorId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "perm_read" BOOLEAN NOT NULL DEFAULT false,
    "perm_write" BOOLEAN NOT NULL DEFAULT false,
    "perm_create" BOOLEAN NOT NULL DEFAULT false,
    "perm_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_authorization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certification_title" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "type" "CertificationType" NOT NULL,

    CONSTRAINT "certification_title_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certification" (
    "id" TEXT NOT NULL,
    "certificationTitleId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "certification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cycles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cycles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "levels" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "cycle_id" INTEGER NOT NULL,

    CONSTRAINT "levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "isTwoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "created_by" TEXT,
    "updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "schoolStudyId" TEXT,
    "schoolChildrenStudyId" TEXT,
    "subjectTitleId" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "client_type" "ClientType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "first_name" VARCHAR(150) NOT NULL,
    "last_name" VARCHAR(150),
    "gender" "GENDER" NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "birth_place" VARCHAR(150),
    "profession" VARCHAR(150),
    "registration_number" VARCHAR(150) NOT NULL,
    "cin" VARCHAR(50),
    "phone" VARCHAR(50)[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostalAddress" (
    "id" SERIAL NOT NULL,
    "profile_id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "is_current" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT,

    CONSTRAINT "PostalAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "family" (
    "id" TEXT NOT NULL,
    "related_user_id" TEXT NOT NULL,
    "relationship" "Relationship" NOT NULL,

    CONSTRAINT "family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_token" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "password_reset_token" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "password_reset_token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "two_factor_token" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "two_factor_token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "two_factor_confirmation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "two_factor_confirmation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "RoleAuthorizationType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "schoolId" TEXT,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "schoolId" TEXT NOT NULL,

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_user" (
    "id" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "assignator_id" TEXT NOT NULL,

    CONSTRAINT "role_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schools" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "code" VARCHAR(150),
    "address" VARCHAR(150),
    "description" TEXT,
    "image_url" TEXT,
    "status" "Status",
    "parcours" "Parcours",
    "cycle_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,

    CONSTRAINT "schools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts_school" (
    "id" TEXT NOT NULL,
    "contact" VARCHAR(150) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "school_id" TEXT NOT NULL,

    CONSTRAINT "contacts_school_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "school_years" (
    "id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "current" BOOLEAN NOT NULL DEFAULT false,
    "start_years" INTEGER NOT NULL,
    "end_years" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "school_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,

    CONSTRAINT "school_years_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "period" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "school_year_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "subject_title" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "codification" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "school_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,

    CONSTRAINT "subject_title_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subject" (
    "id" TEXT NOT NULL,
    "coefficient" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "subject_title_id" TEXT NOT NULL,
    "school_year_id" TEXT NOT NULL,
    "level_id" INTEGER NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT
);

-- CreateTable
CREATE TABLE "staff" (
    "id" TEXT NOT NULL,
    "service_start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "service_end" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "school_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mail" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "spam" BOOLEAN NOT NULL DEFAULT false,
    "senderId" TEXT NOT NULL,
    "reciverId" TEXT NOT NULL,

    CONSTRAINT "Mail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,
    "album" "Albums" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classroom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "headcount" INTEGER NOT NULL,
    "max_space" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "level_id" INTEGER NOT NULL,
    "staff_id" TEXT NOT NULL,
    "school_year_id" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,

    CONSTRAINT "classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registration" (
    "id" TEXT NOT NULL,
    "type" "RegistrationType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "classroom_id" TEXT NOT NULL,
    "school_year_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT
);

-- CreateTable
CREATE TABLE "registration_fee" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "school_year_id" TEXT NOT NULL,
    "level_id" INTEGER NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,

    CONSTRAINT "registration_fee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tutition_fee" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "school_year_id" TEXT NOT NULL,
    "level_id" INTEGER NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,

    CONSTRAINT "tutition_fee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fee_slice" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "month" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tutitionFeeId" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,

    CONSTRAINT "fee_slice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "remaining_amount" DECIMAL(65,30) NOT NULL,
    "type" "PaymentType" NOT NULL,
    "payment_mode" "PaymentMode" NOT NULL,
    "payment_ref" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fee_slice_id" TEXT,
    "registration_fee_id" TEXT,
    "registration_id" TEXT,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_period" (
    "id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "period_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,

    CONSTRAINT "exam_period_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_session" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "start_time" TIME NOT NULL,
    "end_time" TIME NOT NULL,
    "type" "ExamNoteType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "level_id" INTEGER NOT NULL,
    "subject_id" TEXT NOT NULL,
    "exam_period_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,

    CONSTRAINT "exam_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dispatch" (
    "id" TEXT NOT NULL,
    "exam_invigilator" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "exam_period_id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,

    CONSTRAINT "dispatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_exam_room" (
    "id" TEXT NOT NULL,
    "exam_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "studentId" TEXT NOT NULL,
    "dispatch_id" TEXT NOT NULL,

    CONSTRAINT "candidate_exam_room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "note" (
    "id" TEXT NOT NULL,
    "rating" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "student_id" TEXT NOT NULL,
    "exam_session_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,

    CONSTRAINT "note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "correction_tracking" (
    "id" TEXT NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "return_date" TIMESTAMP(3) NOT NULL,
    "copies_released" INTEGER NOT NULL,
    "retuned_copies" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "classroom_id" TEXT NOT NULL,
    "exam_session_id" TEXT NOT NULL,
    "emitter_release_id" TEXT,
    "recipient_release" TEXT,
    "emitter_return_id" TEXT,
    "recipient_return_id" TEXT,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,

    CONSTRAINT "correction_tracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_card" (
    "id" TEXT NOT NULL,
    "total_rating" DECIMAL(65,30) NOT NULL,
    "total_coefficient" INTEGER NOT NULL,
    "student_average" DECIMAL(65,30) NOT NULL,
    "rank" INTEGER NOT NULL,
    "absences" INTEGER NOT NULL,
    "delays" INTEGER NOT NULL,
    "mention" "Mentions" NOT NULL,
    "type" "ExamNoteType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "class_average_id" TEXT,
    "period_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,

    CONSTRAINT "report_card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "class_average" (
    "id" TEXT NOT NULL,
    "average" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "classroom_id" TEXT NOT NULL,
    "period_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,

    CONSTRAINT "class_average_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subject_report_card" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "subjects" TEXT[],
    "type" "ExamNoteType" NOT NULL,
    "period_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,

    CONSTRAINT "subject_report_card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_accessToken_key" ON "sessions"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "client_user_id_key" ON "client"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "registration_number_idx" ON "profile"("registration_number");

-- CreateIndex
CREATE UNIQUE INDEX "profile_cin_key" ON "profile"("cin");

-- CreateIndex
CREATE UNIQUE INDEX "profile_user_id_key" ON "profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_identifier_token_key" ON "verification_token"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_token_token_key" ON "password_reset_token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_token_email_token_key" ON "password_reset_token"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "two_factor_token_token_key" ON "two_factor_token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "two_factor_token_email_token_key" ON "two_factor_token"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "two_factor_confirmation_userId_key" ON "two_factor_confirmation"("userId");

-- CreateIndex
CREATE INDEX "code_idx" ON "schools"("code");

-- CreateIndex
CREATE INDEX "start_end_years_idx" ON "school_years"("start_years", "end_years");

-- CreateIndex
CREATE UNIQUE INDEX "school_years_start_years_end_years_key" ON "school_years"("start_years", "end_years");

-- CreateIndex
CREATE UNIQUE INDEX "period_id_key" ON "period"("id");

-- CreateIndex
CREATE UNIQUE INDEX "subject_title_codification_key" ON "subject_title"("codification");

-- CreateIndex
CREATE UNIQUE INDEX "subject_id_key" ON "subject"("id");

-- CreateIndex
CREATE UNIQUE INDEX "staff_school_id_key" ON "staff"("school_id");

-- CreateIndex
CREATE UNIQUE INDEX "staff_user_id_key" ON "staff"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "classroom_staff_id_key" ON "classroom"("staff_id");

-- CreateIndex
CREATE UNIQUE INDEX "registration_id_key" ON "registration"("id");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authorization" ADD CONSTRAINT "authorization_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authorization" ADD CONSTRAINT "authorization_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_authorization" ADD CONSTRAINT "user_authorization_authorizationId_fkey" FOREIGN KEY ("authorizationId") REFERENCES "authorization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_authorization" ADD CONSTRAINT "user_authorization_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_authorization" ADD CONSTRAINT "user_authorization_assignatorId_fkey" FOREIGN KEY ("assignatorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certification_title" ADD CONSTRAINT "certification_title_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certification_title" ADD CONSTRAINT "certification_title_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certification" ADD CONSTRAINT "certification_certificationTitleId_fkey" FOREIGN KEY ("certificationTitleId") REFERENCES "certification_title"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certification" ADD CONSTRAINT "certification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cycles" ADD CONSTRAINT "cycles_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cycles" ADD CONSTRAINT "cycles_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "levels" ADD CONSTRAINT "levels_cycle_id_fkey" FOREIGN KEY ("cycle_id") REFERENCES "cycles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "levels" ADD CONSTRAINT "levels_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "levels" ADD CONSTRAINT "levels_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_schoolStudyId_fkey" FOREIGN KEY ("schoolStudyId") REFERENCES "schools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_schoolChildrenStudyId_fkey" FOREIGN KEY ("schoolChildrenStudyId") REFERENCES "schools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_subjectTitleId_fkey" FOREIGN KEY ("subjectTitleId") REFERENCES "subject_title"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostalAddress" ADD CONSTRAINT "PostalAddress_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostalAddress" ADD CONSTRAINT "PostalAddress_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostalAddress" ADD CONSTRAINT "PostalAddress_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "family" ADD CONSTRAINT "family_related_user_id_fkey" FOREIGN KEY ("related_user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "two_factor_confirmation" ADD CONSTRAINT "two_factor_confirmation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role" ADD CONSTRAINT "role_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role" ADD CONSTRAINT "role_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role" ADD CONSTRAINT "role_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "schools"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room" ADD CONSTRAINT "room_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room" ADD CONSTRAINT "room_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room" ADD CONSTRAINT "room_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "schools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_user" ADD CONSTRAINT "role_user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_user" ADD CONSTRAINT "role_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_user" ADD CONSTRAINT "role_user_assignator_id_fkey" FOREIGN KEY ("assignator_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schools" ADD CONSTRAINT "schools_cycle_id_fkey" FOREIGN KEY ("cycle_id") REFERENCES "cycles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schools" ADD CONSTRAINT "schools_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schools" ADD CONSTRAINT "schools_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts_school" ADD CONSTRAINT "contacts_school_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "school_years" ADD CONSTRAINT "school_years_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "school_years" ADD CONSTRAINT "school_years_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "school_years" ADD CONSTRAINT "school_years_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "period" ADD CONSTRAINT "period_school_year_id_fkey" FOREIGN KEY ("school_year_id") REFERENCES "school_years"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_title" ADD CONSTRAINT "subject_title_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_title" ADD CONSTRAINT "subject_title_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_title" ADD CONSTRAINT "subject_title_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_subject_title_id_fkey" FOREIGN KEY ("subject_title_id") REFERENCES "subject_title"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_school_year_id_fkey" FOREIGN KEY ("school_year_id") REFERENCES "school_years"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mail" ADD CONSTRAINT "Mail_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mail" ADD CONSTRAINT "Mail_reciverId_fkey" FOREIGN KEY ("reciverId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classroom" ADD CONSTRAINT "classroom_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classroom" ADD CONSTRAINT "classroom_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classroom" ADD CONSTRAINT "classroom_school_year_id_fkey" FOREIGN KEY ("school_year_id") REFERENCES "school_years"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classroom" ADD CONSTRAINT "classroom_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classroom" ADD CONSTRAINT "classroom_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classroom" ADD CONSTRAINT "classroom_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration" ADD CONSTRAINT "registration_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration" ADD CONSTRAINT "registration_school_year_id_fkey" FOREIGN KEY ("school_year_id") REFERENCES "school_years"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration" ADD CONSTRAINT "registration_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration" ADD CONSTRAINT "registration_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration" ADD CONSTRAINT "registration_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration_fee" ADD CONSTRAINT "registration_fee_school_year_id_fkey" FOREIGN KEY ("school_year_id") REFERENCES "school_years"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration_fee" ADD CONSTRAINT "registration_fee_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration_fee" ADD CONSTRAINT "registration_fee_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration_fee" ADD CONSTRAINT "registration_fee_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutition_fee" ADD CONSTRAINT "tutition_fee_school_year_id_fkey" FOREIGN KEY ("school_year_id") REFERENCES "school_years"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutition_fee" ADD CONSTRAINT "tutition_fee_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutition_fee" ADD CONSTRAINT "tutition_fee_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutition_fee" ADD CONSTRAINT "tutition_fee_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fee_slice" ADD CONSTRAINT "fee_slice_tutitionFeeId_fkey" FOREIGN KEY ("tutitionFeeId") REFERENCES "tutition_fee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fee_slice" ADD CONSTRAINT "fee_slice_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fee_slice" ADD CONSTRAINT "fee_slice_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_fee_slice_id_fkey" FOREIGN KEY ("fee_slice_id") REFERENCES "fee_slice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_registration_fee_id_fkey" FOREIGN KEY ("registration_fee_id") REFERENCES "registration_fee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_registration_id_fkey" FOREIGN KEY ("registration_id") REFERENCES "registration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_period" ADD CONSTRAINT "exam_period_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_period" ADD CONSTRAINT "exam_period_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_period" ADD CONSTRAINT "exam_period_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_session" ADD CONSTRAINT "exam_session_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_session" ADD CONSTRAINT "exam_session_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_session" ADD CONSTRAINT "exam_session_exam_period_id_fkey" FOREIGN KEY ("exam_period_id") REFERENCES "exam_period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_session" ADD CONSTRAINT "exam_session_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_session" ADD CONSTRAINT "exam_session_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispatch" ADD CONSTRAINT "dispatch_exam_period_id_fkey" FOREIGN KEY ("exam_period_id") REFERENCES "exam_period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispatch" ADD CONSTRAINT "dispatch_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispatch" ADD CONSTRAINT "dispatch_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispatch" ADD CONSTRAINT "dispatch_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_exam_room" ADD CONSTRAINT "candidate_exam_room_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_exam_room" ADD CONSTRAINT "candidate_exam_room_dispatch_id_fkey" FOREIGN KEY ("dispatch_id") REFERENCES "dispatch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_exam_session_id_fkey" FOREIGN KEY ("exam_session_id") REFERENCES "exam_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correction_tracking" ADD CONSTRAINT "correction_tracking_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correction_tracking" ADD CONSTRAINT "correction_tracking_exam_session_id_fkey" FOREIGN KEY ("exam_session_id") REFERENCES "exam_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correction_tracking" ADD CONSTRAINT "correction_tracking_emitter_release_id_fkey" FOREIGN KEY ("emitter_release_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correction_tracking" ADD CONSTRAINT "correction_tracking_recipient_release_fkey" FOREIGN KEY ("recipient_release") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correction_tracking" ADD CONSTRAINT "correction_tracking_emitter_return_id_fkey" FOREIGN KEY ("emitter_return_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correction_tracking" ADD CONSTRAINT "correction_tracking_recipient_return_id_fkey" FOREIGN KEY ("recipient_return_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correction_tracking" ADD CONSTRAINT "correction_tracking_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correction_tracking" ADD CONSTRAINT "correction_tracking_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_card" ADD CONSTRAINT "report_card_class_average_id_fkey" FOREIGN KEY ("class_average_id") REFERENCES "class_average"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_card" ADD CONSTRAINT "report_card_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_card" ADD CONSTRAINT "report_card_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_card" ADD CONSTRAINT "report_card_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_average" ADD CONSTRAINT "class_average_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_average" ADD CONSTRAINT "class_average_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_average" ADD CONSTRAINT "class_average_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_average" ADD CONSTRAINT "class_average_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_report_card" ADD CONSTRAINT "subject_report_card_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_report_card" ADD CONSTRAINT "subject_report_card_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_report_card" ADD CONSTRAINT "subject_report_card_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
