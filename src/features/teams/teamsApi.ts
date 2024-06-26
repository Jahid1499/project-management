
import { apiSlice } from "../api/apiSlice";
export const teamsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTeams: builder.query({
            query: (email) => `/teams?participants_like=${email}&_sort=timestamp&_order=desc`,
            providesTags: ["team"],
        }),

        addTeam: builder.mutation({
            query: (data) => ({
                url: "/teams",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const team = await queryFulfilled;
                dispatch(
                    teamsApi.util.updateQueryData(
                        "getTeams",
                        arg.participants,
                        (draft) => {
                            draft.unshift(team.data);
                        }
                    )
                );

            }
        }),

        updateTeam: builder.mutation({
            query: ({ id, data }) => ({
                url: `/teams/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["team"],
        }),

        deleteTeam: builder.mutation({
            query: (id) => ({
                url: `/teams/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["team"],
        }),

        addMember: builder.mutation({
            query: ({ id, data }) => ({
                url: `/teams/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["team"],
        }),
    })
})

export const { useGetTeamsQuery, useAddMemberMutation, useAddTeamMutation, useUpdateTeamMutation, useDeleteTeamMutation } = teamsApi;